
# **Dokumentation E-Shop**

## Backend
### model / Item.js
Dies ist ein Javascript-File für das Model des Items. Darin sind **die Attribute** festgelegt. Es wird auch ein Schema für die Datenbank MongoDB erstellt, dass man die Items anschliessend korrekt in der Datenbank einspeichern kann.

### model / Teacher.js (eig. User.js)
Wird gebraucht um die Daten eines Benutzers zu speichern und an die Datenbank zu senden. Es wird ebenfalls ein Schema für MongoDB erstellt.

### routes / routes.js
In diesem File werden die **API-Anfragen und Abfragen konfiguriert**. Darunter gehört zum Beispiel auch die Validierung der Logindaten, wenn sich der User einloggt. Zusätzlich kommen auch ganz einfache Abfragen dazu, wie dass man alle Items bekommen will. Hier der Code als Beispiel dazu:
```javascript 
router.get('/getAllItems',async (request, response) => {
    itemTemplate.find({},function(err, result){
        response.json(result)
    })

}) 
```
## Frontend
### components / Item.js
Dieser Komponent zeigt die Produktdetails an, also wenn man auf Bild des Produkts klickt. Es zeigt das Bild erneut grösser an, der Name des Produkts und die Beschreibung.
Er wird später für die Detail-Seite für die Produkte gebraucht.
Hier die Render-Methode des Komponenten:
```javascript
render(){
        return(
                <div className={"itempreview"}>
                    <Link><img onClick={() => this.props.onClick()} src={this.props.image} alt={this.props.alt}/></Link>
                    <h2>{this.props.name}</h2>
                    <b>Preis: </b><span>{this.props.preis}</span>
                </div>
        )
    }
```

### components / Login.js
Das ist der Komponent, der das Login-Formular für einen Benutzer beinhaltet. In der Methode ```doLogin()``` werden die Logineingaben mittels axios über das Backend validiert.

### components / ShopDrawer.js
Dieser Komponent ist ein sogenannter Drawer. Er wird angezeigt wenn man auf den Warenkorb-Button drückt. Es ist wie ein Dialog, der etwas 1/4 der Seite einnimmt und die Produkte anzeigt, die sich im Warenkorb befinden.

### pages / ItemPage.js
Dies ist die Detail-Page des Produkts. Es wird der Name, das Bild vergrössert, der Preis und die Kategorie gerendert. Zusätzlich kommt noch ein Button dazu, mit dem man das Produkt in den Warenkorb legen kann.

## pages / ItemRegister.js
Dies ist nur ein Komponent um Items zu erfassen und in die Datenbank zu schicken. Wir haben den Komponent benutzt, um effizient Items erfassen zu können.

## pages / ShoppingCart.js
Wie der Name es sagt, ist es der Komponent des Warenkorbs. Dort werden über alle Items gemappt und sie werden mit Bild, Name und Preis dargestellt. Zusätzlich kann man die Anzahl der einzelnen Items noch erhöhen oder verringern.

## stores / ItemStores.js
Eine Klasse, ähnlich wie React Context, um Daten temporär zu speichern. Es wird benutzt um zwischen den Wechsel der Seiten keine Daten verloren gehen und man zum Beispiel das richtige Produkt darstellt.

## stores / UserStores.js
Enthält die wichtigsten Daten zum ***eingeloggten User***.



