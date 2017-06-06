import cortical_api
import java_taskserver_api
import text_google_api

def test_get_keywords_cortical():
    test_text = "play football tomorrow"
    keywords = cortical_api.get_keywords(test_text)
    
    assert keywords == ['football', 'play', 'tomorrow']

def test_get_labels_google():
    test_text = "play football tomorrow"
    keywords = text_google_api.get_tags_for_text(test_text)
    
    assert keywords == ['football']
    
def test_compare_cortical():
    t1, t2 = "go to play football", "playing football"
    value = cortical_api.compare_texts_similarity(t1, t2)
    
    assert value == 0.61158759478668290
