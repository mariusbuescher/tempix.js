## What does it do?

tempix.js is a small JavaScript library for template loading and caching. A template is defined with a name and an url. When requested, the templates are loaded from the server or - if already loaded - they are delivered from localStorage. You can also set the livetime of the templates.

The livetime of the templates is ignored if the appcache is updated wich means if you use tempix.js together with appcache you can more or less force tempix.js to reload the templates by updating cached files.

## Dependencies

tempix.js only depends on jQuery which is used for ajax requests.

## Usage

Include tempix.js source, create a new Tempix object, set the templates and you are ready to go.

    <script src="js/src/tempix.js" type="text/javascript" charset="utf-8"></script>

    <script type="text/javascript" charset="utf-8">
      $(document).ready(function () {
        var tempixInstance = new Tempix();

        tempixInstance.templates = {
          'template-1' : {
            'name' : 'template-1',
            'url' : 'templates/template-1.html',
          },
          'template-2' : {
            'name' : 'template-2',
            'url' : 'templates/template-2.html',
          }
        };
      });
    </script>

## Acknowledgment

The tempy.js project inspired me to do this little helper because I needed something similar for a project but without php code in it to use it in non php environments. basket.js seemed too big for this task.
