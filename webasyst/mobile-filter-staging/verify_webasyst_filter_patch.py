from pathlib import Path


PATCH = Path(__file__).with_name("category-mobile-filter.patch")
text = PATCH.read_text(encoding="utf-8")
lines = text.splitlines()

assert lines[0] == "--- a/category.html"
assert lines[1] == "+++ b/category.html"
assert sum(line.startswith("@@ ") for line in lines) == 1
removed = [line[1:] for line in lines if line.startswith("-") and not line.startswith("---")]
added = [line[1:] for line in lines if line.startswith("+") and not line.startswith("+++")]
assert removed == ['    {if $is_mobile}{include file="./mobile.filters.html"}{/if}']
assert added == ['    {include file="./mobile.filters.html"}']
print("PASS: one category.html include change")

