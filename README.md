to start the server, run

./setup.sh


To enable local storage of data you have change the privacy content in your chrome browser

https://www.chromium.org/for-testers/bug-reporting-guidelines/uncaught-securityerror-failed-to-read-the-localstorage-property-from-window-access-is-denied-for-this-document

### Install Cron jobs for pipeline sync

To install, open `crontab.txt`. Add your project path to FILE_PATH variable in `crontab.txt`.

After that is done, install crontab with `crontab crontab.txt`

Check if the crontab is installed with `crontab -l`

Check process (logs) with `tail -f sync.log`
