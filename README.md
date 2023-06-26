## STEPS TO FOLLOW ##
1. run "npm install"
2. open a shell/script to run the cmd "ngrok http 8080 --host-header=localhost". If you have not 
register with ngrok, you can find it in "https://learn.microsoft.com/en-us/microsoftteams/platform/apps-in-teams-meetings/teams-live-share-tutorial"
3. copy the url from step 2, which appears in the form of "https:/<num-num-num...>.ngrok-free.app"
4. paste the url for the configuration variable "configurationUrl" in manifest.json 
5. zip the color.png, outline.png and manifest.json
6. npm start 
7. upload the zipped file and view in teams.