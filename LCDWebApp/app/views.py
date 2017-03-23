import json
import smartie
from flask import Flask, request, render_template 
from app import app

##app = Flask(__name__)
smartie1 = smartie.Smartie()

@app.route('/<path:filename>')  
def send_file(filename):  
      return send_from_directory('/static', filename)

@app.route("/")
def show_homepage():
    return "Home Page!"

@app.route("/lcd")
def show_lcdpage():
    return render_template("lcd.html")

@app.route("/lcd/on", methods=["POST","GET"])
def display_on():
    smartie1.backlight_on()
    return "Success"

@app.route("/lcd/off", methods=["POST","GET"])
def display_off():
    smartie1.backlight_off()
    return "Success"

@app.route("/lcd/clear", methods=["POST","GET"])
def display_clear():
    smartie1.clear_screen()
    return "Success"

@app.route("/lcd/displaytextflash", methods=["POST"])
def display_flash():
    if not request.json:
        abort(400)
    flashline = request.json['Line']
    text = request.json['Text']
    if len(text) > 0:
        smartie1.write_line_flash(text, flashline)
    return "Success"
    
@app.route("/lcd/displaytext", methods=["POST"])
def display_rawtext():
    if not request.json:
        abort(400)
    rawtext = request.json['Text']
    if len(rawtext) > 0:
        smartie1.clear_screen()
        smartie1.backlight_on()
        smartie1.write_data_wrapped(rawtext)
    return "Success"


@app.route("/lcd/displaymessage", methods=["POST"])
def display_message():
    if not request.json:
        abort(400)
    smartie1.clear_screen()
    smartie1.backlight_on()
    smartie1.write_lines_scroll(request.json['Lines'])
    return "Success"  ##message

if __name__ == "__main__":
    app.run()
