from flask import Flask, request, jsonify

from dao import analyze_sentiment_underthesea

app = Flask(__name__)


@app.route('/api/classification_text', methods=['post'])
def classification_text():
    text_classification = request.json['text']
    res = analyze_sentiment_underthesea(text_classification)
    if res is None:
        return jsonify({'result': "Neutral"})
    return jsonify({'result': res})


if __name__ == '__main__':
    with app.app_context():
        app.run(host='0.0.0.0', port=5000, debug=True)
