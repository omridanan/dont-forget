import retinasdk

API_KEY = "cb736af0-4abe-11e7-b22d-93a4ae922ff1"

liteClient = retinasdk.LiteClient(API_KEY)

def get_keywords(text):
    return liteClient.getKeywords(text)
    
def compare_texts_similarity(text1, text2):
    return liteClient.compare(text1, text2)
    
if __name__ == "__main__":
    print get_keywords("I want to play football")
    
    print compare_texts_similarity("go to play football", "playing football")
    
    

