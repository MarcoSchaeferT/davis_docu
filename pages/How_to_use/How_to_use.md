---
title: DocuDev - How to use?
nav_order: 6
layout: page
permalink: /how_to_use
---



#  [How to use template: just-the-docs?](https://just-the-docs.com/)
click [link](https://just-the-docs.com/)
[Link button](https://just-the-docs.com){: .btn }

## run local instance:
<div class="code-example" markdown="1">
```bash
cd /YOUR_RPOSITORY
bundle exec jekyll serve --livereload
```
</div>
--------

## install missing gems
```bash
bundle install
```

## add new gems/packages:
<div class="code-example" markdown="1">
```bash
#bundle add GEM_NAME
bundle add jemoji
```
</div>
and add in the _config.yml
<div class="code-example" markdown="1">
```ruby
plugins:
  - jemoji
```
</div>
code:
<div class="code-example" markdown="1" >```bash
 :+1:, :wink: :cry: :laughing:
```
</div>
result: :+1:, :wink: :cry: :laughing:




