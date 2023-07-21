import requests
from flask import Flask, request, jsonify
from gevent import monkey
import gevent
monkey.patch_all()

app = Flask(__name__)

def get_numbers_from_url(url):
    try:
        response = requests.get(url, timeout=0.5)
        if response.status_code == 200:
            data = response.json()
            if 'numbers' in data and isinstance(data['numbers'], list):
                return data['numbers']
    except (requests.exceptions.Timeout, requests.exceptions.RequestException):
        pass
    return []

@app.route('/numbers')
def get_merged_numbers():
    urls = request.args.getlist('url')
    jobs = [gevent.spawn(get_numbers_from_url, url) for url in urls]
    gevent.joinall(jobs, timeout=0.5)
    merged_numbers = sorted(list(set(num for job in jobs for num in job.value)))
    return jsonify(numbers=merged_numbers)

if __name__ == '__main__':
    app.run(host='localhost', port=8008)
