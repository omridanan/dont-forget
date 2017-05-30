# Imports the Google Cloud client library
from google.cloud import language
import sys, getopt

# Instantiates a client
language_client = language.Client()

def test(argv):
	try:
		opts, args = getopt.getopt(argv,"ht:")
	except:
		print 'test.py -t <task>'
	        sys.exit(2)
	for opt, arg in opts:
		if opt == '-h':
         	print 'test.py -t <task>'
			sys.exit(2)
    	elif opt in ("-t"):
     		text = arg
         		
	# The text to analyze
	document = language_client.document_from_text(text)

	# Detects the sentiment of the text
	sentiment = document.analyze_sentiment().sentiment
	entities = document.analyze_entities().entities

	print('Text: {}'.format(text))
	print('Sentiment: {}, {}'.format(sentiment.score, sentiment.magnitude))
	#print('Entities: {}, {}'.format(sentiment.name))
	for entity in entities:
        	print('Entity: {}'.format(entity.name))

def get_tags_for_text(text):
	document = language_client.document_from_text(text)

    # Detects the sentiment of the text
    entities = document.analyze_entities().entities
	
	return [str(entity.name) for entity in entities]

if __name__ == "__main__":
  test(sys.argv[1:])
  #print get_tags_for_text("go play football tomorow")
  #print get_tags_for_text("play football with friends")
