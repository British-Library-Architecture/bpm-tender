#.SILENT:

HOST = localhost

HTTP_200 = "HTTP/1.1 200"
HTTP_403 = "HTTP/1.1 403"
HTTP_404 = "HTTP/1.1 404"

CURL = curl -siL
GREP = grep
HTTP_TEST = /bin/bash ./test-http-status

test: test-api test-bankaccount test-identity
	@echo ">>> Test complete"

test-api:
	$(CURL) $(HOST)/api     | $(GREP) $(HTTP_200)
	$(CURL) $(HOST)/api/v1  | $(GREP) $(HTTP_403)
	@echo ">>> Test passed: $@"

test-bankaccount:
	$(CURL) $(HOST)/api/v1/bankaccount                  | $(GREP) $(HTTP_200)
	$(CURL) $(HOST)/api/v1/bankaccount/200415           | $(GREP) $(HTTP_200)
	$(CURL) $(HOST)/api/v1/bankaccount/200415/38290008  | $(GREP) $(HTTP_200)
	$(CURL) $(HOST)/api/v1/bankaccount/200415/38290009  | $(GREP) $(HTTP_404)
	@echo ">>> Test passed: $@"

test-identity:
	$(CURL) $(HOST)/api/v1/identity                     | $(GREP) $(HTTP_200)
	$(CURL) $(HOST)/api/v1/identity/gwicks              | $(GREP) $(HTTP_200)
	$(CURL) $(HOST)/api/v1/identity/gwicks/secret1234   | $(GREP) $(HTTP_200)

	$(CURL) $(HOST)/api/v1/identity/baduser             | $(GREP) $(HTTP_404)
	$(CURL) $(HOST)/api/v1/identity/gwicks/badpassword  | $(GREP) $(HTTP_404)
	@echo ">>> Test passed: $@"

guy:
	$(HTTP_TEST) /api/v1/identity $(HTTP_200)
