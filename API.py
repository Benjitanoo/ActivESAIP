from flask import Flask, jsonify
from flask_cors import CORS
import csv
app = Flask(__name__)
from datetime import datetime, date
import locale
CORS(app)

locale.setlocale(locale.LC_TIME, 'fr_FR.UTF-8')

@app.route('/Excel_data', methods=['GET'])
def get_data():
    evenement_list = []  # changed variable name to evenement_list
    with open("Files/Evenements/evenements.csv", 'r', encoding='utf-8-sig') as eventdisplay:
        eventdisplay_reader = csv.reader(eventdisplay, delimiter=';')
        evenement_list = []  # changed variable name to evenement_list
        for row in eventdisplay_reader:
            date_str = row[0]
            etablissement = row[1]
            specialite = row[2]
            localisation = row[3]   
            
            try:
                # Convert date string to datetime object
                date = datetime.strptime(date_str, '%d-%m-%Y').date()
                
                # Check if date is in the future
                if date >= date.today():
                    evenement_list.append({  # changed variable name to evenement_list
                        'Date': date_str,
                        'Nom etablissement': etablissement,
                        'Specialite': specialite,
                        'Localisation': localisation
                    })
            except ValueError:
                # Skip this row if date_str is not a valid date string
                pass

        print(evenement_list)  # changed variable name to evenement_list

        with open("Files/Menu/menu.csv", 'r') as csvfile:
            csv_reader = csv.reader(csvfile, delimiter=';')
            data = [row for row in csv_reader]
            data[0] = [element.lower() for element in data[0]]

            # Récupération du jour actuel
            days_of_week = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
            today = datetime.today().strftime('%A').lower()
            today_day = today.split(' ')[0]  # Extraction du nom du jour de la semaine


            # Trouver l'index de la colonne correspondant au jour de la semaine actuel
            day_index = days_of_week.index(today_day)
            print(day_index)
            # Afficher le plat et le dessert pour le jour de la semaine actuel
            entree = data[1][day_index].replace("\n", " ")
            plat = data[2][day_index].replace("\n", " ")
            dessert = data[3][day_index].replace("\n", " ")
            print(f"Entrée : {entree}, Plat : {plat}, Dessert : {dessert}")



            return jsonify({'day': today, 'entree': entree , 'plat': plat , 'dessert' : dessert, 'evenement': evenement_list})  # changed variable name to evenement_list

    
if __name__ == '__main__':
    app.run(debug=True)
    print('API Start !')

#Pour faire fonctionner l'API :
#Click droit "Executez le fichier dans le terminal"
#Ensuite dans le terminal tapez "Python API.py"
#http://127.0.0.1:5000/Excel_data c'est l'adresse de l'api qui nous sort toute nos data en Json
#La requete fetch pour le js est tout au fond du fichier JS
#les fichiers evenements et menu sont hyper important à garder c'est leur route respective