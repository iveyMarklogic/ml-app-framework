const { handleDocumentsRes, handleSearchRes} = require('./handlers');

let searchResultXML = {
  "results": [
      {
          "index": 1,
          "extracted": {
              "kind": "element",
              "content": [
                  "<test>\n  <id>val</id>\n</test>"
              ]
          }
      }
  ]
};
// Convert to buffer
searchResultXML = Buffer.from(JSON.stringify(searchResultXML), 'utf8');

let searchResultJSON = {
  "results": [
      {
          "index": 1,
          "extracted": {
              "kind": "element",
              "content": [
                  {"test":{"id":"val"}}
              ]
          }
      }
  ]
};
// Convert to buffer
searchResultJSON = Buffer.from(JSON.stringify(searchResultJSON), 'utf8');

let documentXML = '<?xml version="1.0" encoding="UTF-8"?><test><id>val</id></val>';
// Convert to buffer
documentXML = Buffer.from(documentXML, 'utf8');

let documentJSON = '{"test":{"id":"val"}}';
// Convert to buffer
documentJSON = Buffer.from(documentJSON, 'utf8');

describe('handleSearchRes', () => {
  test('Transforms a search reponse with extracted XML', async () => {
    let transformed = handleSearchRes(searchResultXML);
    transformed = JSON.parse(transformed);
    expect(transformed.results[0].extracted.test.id).toBe("val");
  });
  test('Does not transform a search reponse with extracted JSON', async () => {
    let transformed = handleSearchRes(searchResultJSON);
    transformed = JSON.parse(transformed);
    expect(transformed.results[0].extracted.test.id).toBe("val");
  });
});

describe('handleDocumentsRes', () => {
  test('Transforms an XML document', async () => {
    const mockRes = {
      getHeader: jest.fn(str => 'application/xml'),
      setHeader: jest.fn()
    }
    let result = handleDocumentsRes(documentXML, null, null, mockRes);
    result = JSON.parse(result);
    expect(result.test.id = "val");
    expect(mockRes.getHeader.mock.calls).toHaveLength(1);
    expect(mockRes.getHeader.mock.calls[0][0]).toBe("content-type");
    expect(mockRes.setHeader.mock.calls).toHaveLength(1);
    expect(mockRes.setHeader.mock.calls[0][0]).toBe("content-type");
    expect(mockRes.setHeader.mock.calls[0][1]).toBe("application/json");
  });
  test('Does not transform a JSON document', async () => {
    const mockRes = {
      getHeader: jest.fn(str => 'application/json'),
      setHeader: jest.fn()
    }
    let result = handleDocumentsRes(documentJSON, null, null, mockRes);
    result = JSON.parse(result);
    expect(result.test.id = "val");
    expect(mockRes.getHeader.mock.calls).toHaveLength(1);
    expect(mockRes.getHeader.mock.calls[0][0]).toBe("content-type");
    expect(mockRes.setHeader.mock.calls).toHaveLength(0);
  });
});