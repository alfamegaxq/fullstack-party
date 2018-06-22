Coding standards
================

### Install composer
    composer install

1) How to setup code sniffer
----------------------------------
 * Add code sniffer in Settings | Languages & Frameworks | PHP | Code Sniffer.
 * Select PHP Code Sniffer (phpcs) path: `<conding-standarts>/vendor/bin/phpcs` and click on Validate
 * Click OK


 * Turn on PHP Code Sniffer inspections in Settings | Editor | Inspections | PHP | PHP Code Sniffer validation.
 * Select the Custom coding standard in the list (use the Refresh button if needed) and select path to custom ruleset `<conding-standarts>/configs/CodeSniffer/phpcs.xml`.
 * Click OK to enable these new settings


2) How to setup PhpStorm code style
----------------------------------
 * Add code style in Settings | Editor | Code style | PHP.
 * Click on "Manage..." and import code style (Intellij IDEA code style XML): `<conding-standarts>/configs/PhpStorm/CodingStyle.xml`
 * Click OK

3) How to setup mess detector
----------------------------------
 * Add mess detector in Settings | Languages & Frameworks | PHP | Mess Detector.
 * Select PHP Mess Detector (phpmd) path: `<conding-standarts>/vendor/bin/phpmd` and click on Validate
 * Click OK

 * Turn on PHP Mess Detector in Settings | Editor | Inspections | PHP | PHP Mess Detector validation.
 * Select all validation options
 * Click OK to enable these new settings

Known issues
============

* node docker container has permission issues, so docker needs to be built using sudo
* after refreshing page user needs to log in again. need to persist state to local storage, or save code to cookie and retry login
* issues filter missing. didn't find how to get total or pages count of closed issues.
* missing tags and their styles
