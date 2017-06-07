# Imports the Google Cloud client library
from google.cloud import language
# from google.cloud import language
import sys, getopt
 
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/ubuntu/workspace/server/external_api/dont-forget-cd07616e19e2.json"

# Instantiates a client
language_client = language.Client()
# client = language.Client()

def test(argv):
	text = argv[0]
	
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
	
	entities_dict = {}
	
	for entity in entities:
		entities_dict[entity.name] = {
			'type' : entity.entity_type,
			'salience' : entity.salience
		}
	
	return entities_dict

	
def get_full_data(text):
	 # Instantiates a plain text document.
    document = language_client.document_from_text(text)

    # Detects entities in the document. You can also analyze HTML with:
    #   document.doc_type == language.Document.HTML
    entities = document.analyze_entities().entities

    for entity in entities:
        print('=' * 20)
        print(u'{:<16}: {}'.format('name', entity.name))
        print(u'{:<16}: {}'.format('type', entity.entity_type))
        print(u'{:<16}: {}'.format('metadata', entity.metadata))
        print(u'{:<16}: {}'.format('salience', entity.salience))
        print(u'{:<16}: {}'.format('wikipedia_url',
              entity.metadata.get('wikipedia_url', '-')))

if __name__ == "__main__":
  #test(sys.argv[1:])
  #print get_tags_for_text("go play football tomorow")
  #print get_tags_for_text("play football with friends")
  print get_tags_for_text("play football tommorow with friends")
