#!/usr/bin/env bash

PROJECT=$(php -r "echo dirname(dirname(dirname(realpath('$0'))));")
STAGED_FILES_CMD=$(git diff --cached --name-only --diff-filter=ACMR HEAD | grep \\.php)
pwd=`pwd`

# Determine if a file list is passed
if [ "$#" -eq 1 ]
then
    oIFS=$IFS
    IFS='
    '
    SFILES="$1"
    IFS=$oIFS
fi
SFILES=${SFILES:-$STAGED_FILES_CMD}

echo "Checking PHP Lint..."
for FILE in $SFILES
do
    php -l -d display_errors=0 $PROJECT/$FILE
    if [ $? != 0 ]
    then
        echo "Fix the error before commit."
        exit 1
    fi
    FILES="$FILES $PROJECT/$FILE"
done

if [ "$FILES" != "" ]
then
    echo "Running Code Sniffer..."

    TMP_DIR=/tmp/$(uuidgen)
    mkdir -p $TMP_DIR
    for FILE in $SFILES
    do
        mkdir -p $TMP_DIR/$(dirname $FILE)
        git show :$FILE > $TMP_DIR/$FILE
    done
    $pwd/bin/phpcs --standard=$pwd/contrib/configs/CodeSniffer/phpcs.xml --encoding=utf-8 -n -p $TMP_DIR
    PHPCS_ERROR=$?
    rm -rf $TMP_DIR
    if [ $PHPCS_ERROR != 0 ]
    then
        echo "Fix the error before commit."
        exit 1
    fi
fi

exit $?
