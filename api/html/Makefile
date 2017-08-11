#
# 
#
THEME=raml2html-default-theme

%.html: %.raml
	raml2html --theme '$(THEME)' -i $< -o $@

.PHONY: api-docs
api-docs: bankaccount.html identity.html