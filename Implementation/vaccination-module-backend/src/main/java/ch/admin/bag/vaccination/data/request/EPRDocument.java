/**
 * Copyright (c) 2023 eHealth Suisse
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the “Software”), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
package ch.admin.bag.vaccination.data.request;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.openehealth.ipf.commons.ihe.xds.core.responses.RetrievedDocument;

/**
 * EPRDocument class was created to be able to validate if the Retrieved Document was created,
 * modified or deleted by an HCP or ASS or by a PAT or REP. It contains both validation information
 * and the document retrieved from EPD.
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class EPRDocument implements Serializable {

  private boolean isTrusted;
  private String jsonOrXmlFhirContent;
  private transient RetrievedDocument retrievedDocument;

  public EPRDocument(boolean isTrusted, RetrievedDocument retrievedDocument) {
    this(isTrusted, null, retrievedDocument);
  }
}
