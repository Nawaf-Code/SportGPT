from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import argparse
from langchain.vectorstores.chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms.ollama import Ollama

from get_embedding_function import get_embedding_function

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CHROMA_PATH = "chroma"

PROMPT_TEMPLATE_1 = """
Act as a guide, helping the audience and answering their questions.
Your name is: SportGPT

The fan will ask you two questions: about the match or about the stadium and escorts.

If the fan asks you a question about the match, you must answer the question based on the information pulled from the database. If you don't know the answer, don't answer and apologize.

If the fan asks you a question about the stadium and escorts, or needs you to direct them to a location in the stadium, first review the seat information.

The seat ID number shows you where the fan seat is in the stadium. They may ask you which gate is closest to their seat, etc.

The first letter of the seat ID represents the seat in a specific zone in the stadium.
The second digit of the seat ID represents the floor number.
Then, three random numbers.

Below is the ID information for the seat that asked you:
{id}

When a fan needs help getting to their seat, direct them to the gate number near their seat and then have them use AR technology to be guided to their seat.
Your answer should be brief.

If fan ask you a question about the facilities near their seat, answer using the information pulled from the database.

Here is the information pulled from the database, based on which the user answers the fan question:

{context}

---

Answer the question based on the above context: {question}
"""

REPORT_PROMPT_TEMPLATE_2 = """
Write a report on the first half of the match that will benefit the fans.

Mention the most important events and write them briefly and clearly.

Do not add any symbols to the report like *.


if you mention a name or headline add strong element and in the below an example:
<strong> Player Name </strong>
or
<strong> Key Events</strong>


Please Remove the *
Do not write events after the 45 minute.



The following context is an event of the match:

{context}

"""

def query_rag(query_text: str, prompt, n, seat_id):
    # Prepare the DB.
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    results = db.similarity_search_with_score(query_text, k=n)

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(prompt)
    prompt = prompt_template.format(context=context_text, question=query_text, id = seat_id)
    # print(prompt)

    model = Ollama(model="llama3")
    response_text = model.invoke(prompt)
    return response_text


class ChatRequest(BaseModel):
    message: str
    set_id: str
    user_id: str = None

@app.post("/chat")
async def chat_response(chat_request: ChatRequest):


    message = chat_request.message
    setId = chat_request.set_id
    
    response_text = query_rag(message, PROMPT_TEMPLATE_1, 5, setId)
    response = {
        "original_message": chat_request.message,
        "response": response_text,
        "status": "success"
    }

    
    return response


@app.get("/report/first-half-report")
async def report_response():


    report = query_rag("Match events first half from minute 1 to minute 45", REPORT_PROMPT_TEMPLATE_2, 20, "A")

    response = {
        "response": report,
        "status": "success"
    }
    return response


# one more for "/report/full-match-report"