Demonstration app

Installation (Unix based systems)
---

You need to install nodejs and grunt. On linux, this can be done by the following command.

    sudo apt-get install npm 

Install Yeoman globally (it's containing Grunt, Bower, etc.. see http://yeoman.io/):

    npm install -g yo
    
For the List out the dependencies you have installed for a project, run:

    sudo bower list    
    
To install one or more dependencies:

    sudo bower install
    


Launching
---

Launching the client is based on the using Grunt tool (which is the part of the Yeoman tools)

    cd app
    sudo grunt serve

Alternatively, you can also run any http server in the app directory (in You have trouble with the running app using Grunt serve command).

For example:

    python -m SimpleHTTPServer 9000


Order grid processing flow
---

Vzhledem k tomu ze vykresleni gridu a zobrazeni je realizovano za pomoci volani
nekolika separatnich HTTP sluzeb je kompletni zobrazeni obsahu gridu realizovano nasledovne:
 
Prvotni inicializace (pri vstupu na danou entitu):

    initData : 
        Obstarava nacteni defaultniho view configu (struktura pro zakladne vykreslene sloupce)
    
    processDataAndPrepare : na zaklade predaneho view configu v parametru vytvori sloupce s potrebnymi vlastnosti a sablonami
        zde jsou zpracovana podbarveni milniku, nastaveni filtrovani nad jednotlivymi sloupci
        vypinani groupovani nad sloupcem. Cokoliv ohledne custom obsahu sloupce ci vypoctu hodnot se deje zde.
        Jelikoz Kendo neumi rozumne nastavit dataset pripravenych sloupcu namisto jiz existujicich 
        je tato metoda volana po kazde zmene pohledu. 
         
    prepareGridModel : Jelikoz neni pouzita inline editace, staci pouze zakladni model 
        S ID a cislem zakazky, .  
 
    initGrid : Konfigurace vlastnosti gridu, strankovani, read metody, etc..
       Zde se predavaji hotove sloupce a a upravuje se nastaveni filtru v read metode,
       ktera je volana vzdy po zmene pohledu, filtru, ci projektu.
