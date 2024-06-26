/**
 * Copyright (c) 2022 eHealth Suisse
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
package ch.fhir.epr.adapter.data.dto;

import java.time.LocalDate;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * DTO of the vaccination data between the backend and the frontend
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
public class VaccinationDTO extends BaseDTO {
  private List<ValueDTO> targetDiseases;
  private Integer doseNumber;
  private LocalDate occurrenceDate;
  private String lotNumber;
  private ValueDTO reason;
  private ValueDTO status;

  public VaccinationDTO(String id, ValueDTO code, List<ValueDTO> targetDiseases,
      List<CommentDTO> comments, Integer doseNumber, LocalDate occurrenceDate, HumanNameDTO performer,
      String organization, String lotNumber, ValueDTO reason, ValueDTO status) {
    this.targetDiseases = targetDiseases;
    this.doseNumber = doseNumber;
    this.occurrenceDate = occurrenceDate;
    this.lotNumber = lotNumber;
    this.reason = reason;
    this.status = status;
    setId(id);
    setCode(code);
    setRecorder(performer);
    setOrganization(organization);
    setComments(comments);
  }

  @Override
  public LocalDate getDateOfEvent() {
    return getOccurrenceDate();
  }

  @Deprecated
  public ValueDTO getVaccineCode() {
    return getCode();
  }

  @Deprecated
  public void setVaccineCode(ValueDTO code) {
    setCode(code);
  }
}