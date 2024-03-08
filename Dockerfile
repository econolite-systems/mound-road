# SPDX-License-Identifier: MIT
# Copyright: 2023 Econolite Systems, Inc.

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/apps/mound-road/ .
