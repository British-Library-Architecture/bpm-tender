.SILENT:

HOST = localhost

HTTP_200 = "HTTP/1.1 200"
HTTP_201 = "HTTP/1.1 201"
HTTP_400 = "HTTP/1.1 400"
HTTP_403 = "HTTP/1.1 403"
HTTP_404 = "HTTP/1.1 404"

CURL = curl -siL
GREP = grep
HTTP_TEST = /bin/bash ./bin/test-http-status

test: test-api test-bankaccount test-identity test-catalogue
	@echo ">>> Test complete"

test-api:
	$(HTTP_TEST) $(HOST)/api     $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1  $(HTTP_403)
	@echo ">>> Test passed: $@"

test-bankaccount:
	$(HTTP_TEST) $(HOST)/api/v1/bankaccount                 $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1/bankaccount/200415          $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1/bankaccount/200415/38290008 $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1/bankaccount/200415/38290009 $(HTTP_404)

test-identity:
	$(HTTP_TEST) $(HOST)/api/v1/identity                    $(HTTP_200)
#	$(HTTP_TEST) $(HOST)/api/v1/identity/gwicks             $(HTTP_200)
#	$(HTTP_TEST) $(HOST)/api/v1/identity/gwicks/secret1234  $(HTTP_200)

	$(HTTP_TEST) $(HOST)/api/v1/identity/baduser            $(HTTP_404)
#	$(HTTP_TEST) $(HOST)/api/v1/identity/gwicks/badpassword $(HTTP_404)

	$(HTTP_TEST) $(HOST)/api/v1/identity/newuser/secret1234 $(HTTP_201) POST
	$(HTTP_TEST) $(HOST)/api/v1/identity/newuser            $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1/identity/newuser/secret1234 $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1/identity/newuser/wrong      $(HTTP_404)
	@echo ">>> Test passed: $@"

test-catalogue:
	$(HTTP_TEST) $(HOST)/api/v1/catalogue                     $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1/catalogue/isbn                $(HTTP_404)
	$(HTTP_TEST) $(HOST)/api/v1/catalogue/isbn/               $(HTTP_404)
	$(HTTP_TEST) $(HOST)/api/v1/catalogue/isbn/12345678       $(HTTP_404)
	$(HTTP_TEST) $(HOST)/api/v1/catalogue/isbn/9780224063784  $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1/catalogue/isbn/ABCDEFG        $(HTTP_400)



#
#
#
testtest:
#	$(HTTP_TEST) $(HOST)/api/v1/identity $(HTTP_200)
#	$(HTTP_TEST) $(HOST)/api/v1/identity $(HTTP_404)
	$(HTTP_TEST) $(HOST)/api/v1/identity/newuser/secret1234 $(HTTP_201) POST

