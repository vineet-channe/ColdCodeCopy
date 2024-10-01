from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

client = MongoClient(
    'mongodb+srv://lokesh:lokcode18@cluster0.2lesf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['coldcode']
students_collection = db['students']
mentors_collection = db['mentors']


def calculate_match_score(student, mentor):
    score = 0

    if student['academic_interests'] == mentor['skills_expertise']:
        score += 0.2

    if student['career_aspirations'] == mentor['background_industry']:
        score += 0.2

    if student['expected_hours'] == mentor['availability']:
        score += 0.2

    if any(lang in mentor['languages'] for lang in student['preferred_languages']):
        score += 0.3

    if any(style in mentor['communication_preferences'] for style in student['preferred_communication']):
        score += 0.1

    return score


def find_best_mentors(student):
    mentors = mentors_collection.find()
    scores = []

    for mentor in mentors:
        score = calculate_match_score(student, mentor)
        scores.append((mentor, score))

    top_mentors = sorted(scores, key=lambda x: x[1], reverse=True)[:5]

    return [str(mentor[0]['_id']) for mentor in top_mentors]


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/match/<student_id>', methods=['GET'])
def match(student_id):
    student = students_collection.find_one({'_id': ObjectId(student_id)})
    if not student:
        return jsonify({"error": "Student not found"}), 404

    top_mentors = find_best_mentors(student)
    return jsonify(top_mentors)


if __name__ == '__main__':
    app.run(debug=True)
