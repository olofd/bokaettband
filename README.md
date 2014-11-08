Bokaettband.se
===========

En portal för artister och arrangörer i sverige att hitta varandra


Vad behöver du ha installerat?
==============================
1. Visual Studio 2013
2. Node
3. Grunt
4. Bower
5. Git (såklart)
6. Url-Rewrite-module http://www.iis.net/downloads/microsoft/url-rewrite

Sätt upp projektet:
====================

1. Går till den folder där du vill ha projektet och kör 'git clone https://github.com/olofd/bokaettband.git' från CMD (Kommandotolken)
2. Ställ dig i roten på projektet där du har .sln-filen.
3. Kör 'nuget restore Bokaettband.sln'
4. Navigera till /FrontEnd (cd .../FrontEnd)
5. Kör 'npm install'
6. Kör 'bower install'
7. Installera URL-rewrite-module för IIS om du inte redan har den. http://www.iis.net/downloads/microsoft/url-rewrite
8. Starta IIS och skapa en ny sida på port 12345, peka sidan på mappen WebServer.
9. Högerklicka på sidan i IIS och klicka 'Add Virtual Directory'. Ge denna namnet/alias 'FrontEnd' och peka den på foldern FrontEnd i projektmappen.
10. Starta Visual Studio 2013 som Adminstartor och öppna projektfilen Bokaettband.sln
11. Sätt WebServer som startup-projekt om så inte redan är fallet.
12. Bygg projektet i Visual Studio 
13. Besök sidan http://localhost:12345
14. Lägg till användaren 'iusr_bokaettband' med lösenord 'bokaettbanddev' i SQL Express eller SQL Server.
15. Databasen är byggd med Code-First, vilket innebär att den skall generera sig själv om den inte finns på din dator. (Se till att klicka ur enforce password policy då detta lösenord kommer vara samma föralltid under utveckling). 
