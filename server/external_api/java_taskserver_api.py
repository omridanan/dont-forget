import requests

SERVER_PORT = 9999
SERVER_HOST = "127.0.0.1"
SERVER_BASE_URL = "http://{SERVER_HOST}:{port}"
SERVER_URL = "{server_base_url}/{user_id}/processTask/{task_id}"


def process_task(user_id, task_id):
    url = SERVER_URL.format(
        server_base_url=SERVER_BASE_URL,
        user_id=user_id,
        task_id=task_id
    )
    
    response = requests.get(url)
    
    return response.text
    