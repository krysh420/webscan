# WEBSCAN - WEB VULNERABILITY SCANNER
WebScan is a Python and React based GUI wrapper for Nikto. It is powered by Docker and is cross-platform. You can scan any web server in your local network.

> [!CAUTION]
> We are not liable in case of any unauthorized use of this tool on any site, without explicit permission from the site owner.

> [!NOTE]
> Keep Docker/Podman running when trying to use our tool.

> [!IMPORTANT]
> Make sure to download Docker/Podman.
> Make sure to get a Google Search API key, by visiting https://developers.google.com/custom-search/v1/introduction.

## Requirements:
- Python 3.10+
- Docker or Podman
- NodeJS
- Google Search API key: [CHECK IMPORTANT NOTE]

## How to Run:
### Windows:
- Clone this repository:
  `git clone https://github.com/krysh420/webscan`
- Navigate to this folder using CLI or Explorer and Right click -> Open in Terminal.
- If you are running this for the first time, execute the command :
  `.\setup.ps1`
- Now the setup will guide you for initial setup and installing dependencies.
- Reopen the terminal and now execute this command in terminal: `.\app.ps1`
- This will automatically start the servers for app. 
- Now copy the following in any Web Browser and hit enter:
            http://localhost:2000/

### Linux:
- Clone this repository:
   `git clone https://github.com/krysh420/webscan`
- Navigate to this floder using CLI or Explorer, Right click -> Open terminal here.
- For first run, execute `./setup.sh`.
- If env is not getting activated, you need to activate it manually by using the following command: `source WebScan/env/bin/activate`. Then try to run setup again.
- To run the app, execute `./app.sh`.
- Open your browser and go to http://localhost:2000/

## Common Troubleshooting
- Docker not working? Make sure to turn it on everytime you use. Linux users can use `systemctl` or `service` to set it to start Docker automatically on boot.
- For Linux distros with externally managed environments (for example, ParrotOS), you can manually install Python requirments by going to WebScan/scripts/ and running `pip install -r requirements.txt --break-system-packages`. The packages used in the project should not break any system components (If they did, mine would break too since I use Parrot myself).
- What to do about SSL option on the app? Check your web server URL, does it have `http://` or `https://`. If `https://` set that option to True, else put it on false.
