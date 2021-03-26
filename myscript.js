#!/usr/bin/env

#git status

while read -r line; do
    process "$line"
done < <(git branch -a)
