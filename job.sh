#!/bin/bash
#list=$(sudo find /var/log -name "*.gz" -mtime 1)
list=$(sudo find /var/log -name "*.gz")
date=$(date +%Y%m%d --date '1 days ago')
echo $date
for file in $list
do
  renamefile=$(basename $file)
  echo $renamefile
  # s3 upload
  aws s3 cp $file s3://gitlab-log-test/$date/$renamefile
done