from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    set_id: str
    user_id: str = None

@app.post("/chat")
async def chat_response(chat_request: ChatRequest):
    """
    Enhanced chat endpoint that:
    - Accepts a message payload
    - Returns a welcome response
    - Can be extended for actual chat processing
    """
    # Here you could add chat processing logic
    # For now just returns a welcome message

    message = chat_request.message
    setId = chat_request.set_id

    response = {
        "original_message": chat_request.message,
        "response": "ياهلا وسهلا",
        "status": "success"
    }

    
    return response


@app.get("/report/first-half-report")
async def chat_response():

    report = """

بدأ الشباب التسجيل مبكرًا عن طريق دانيل بودينسي في الدقيقة 7، لكن الهلال عاد بهدف التعادل عن طريق سيرجي ميلينكوفيتش سافيتش في الدقيقة 31، لينتهي الشوط الأول بهدف لكل فريق.

 

وفي بداية الشوط الثاني، سجل سالم الدوسري هدف التقدم للهلال في الدقيقة 46، ثم تعادل الشباب مجددًا عبر محمد الشويرخ في الدقيقة 63.

7 بطاقات في مباراة الهلال والشباب

 

شهدت المباراة الكثير من الالتحامات، وأشهر الحكم 7 بطاقات صفراء، منها 5 للشباب و2 للهلال.

 

ترتيب الهلال في الدوري السعودي

 

ويحتل الهلال المركز الثاني بـ62 نقطة، خلف الاتحاد المتصدر بـ4 نقاط. فاز في 19 مباراة، تعادل 5 مرات، وخسر 5. سجل 79 هدفًا واستقبل 34.

 

ترتيب الشباب

فيما يأتي الشباب في المركز السادس بـ51 نقطة، بفارق 5 نقاط عن المركز الرابع. فاز في 15 مباراة، تعادل 6، وخسر 8. سجل 54 هدفًا وتلقى 33.

 

تشكيلة الفريقين:

 

الهلال:

بونو – كانسيلو، تمبكتي، البليهي، لودي – الدوسري، سافيتش، نيفيز، كايو – مالكوم، ميتروفيتش.

 

الشباب:

المعيوف – محمد الثاني، الشويرخ، هوديت، رينان – جوانكا، بونافينتورا، الجوير – بودينسي، حمدالله، كاراسكو

 

تفوق هلالي في المواجهات المباشرة:

 

تقابل الفريقان 53 مرة في الدوري، فاز الهلال في 29، وفاز الشباب في 8، وتعادلا في 16 مباراة.

    """

    response = {
        "response": report,
        "status": "success"
    }
    return response


# one more for "/report/full-match-report"