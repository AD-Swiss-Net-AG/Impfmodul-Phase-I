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
package ch.admin.bag.vaccination.data.request;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ch.fhir.epr.adapter.data.dto.ValueDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Request class for all the translations needed for the PDF export.
 */
@NoArgsConstructor
@Getter
public class TranslationsRequest {
  @Setter
  private List<ValueDTO> targetDiseases;
  private List<ValueDTO> vaccineCodes;
  private List<ValueDTO> allergyCodes;
  private List<ValueDTO> medicalProblemCodes;
  private List<ValueDTO> illnessCodes;

  @JsonIgnore
  private Map<String, String> vaccineCodeToName;
  @JsonIgnore
  private Map<String, String> allergyCodeToName;
  @JsonIgnore
  private Map<String, String> illnessCodeToName;
  @JsonIgnore
  private Map<String, String> medicalProblemCodeToName;

  public void setAllergyCodes(List<ValueDTO> allergyCodes) {
    this.allergyCodes = allergyCodes;
    if (allergyCodes != null) {
      allergyCodeToName = allergyCodes.stream().distinct()
                            .collect(Collectors.toMap(ValueDTO::getCode, ValueDTO::getName));
    }
  }

  public void setIllnessCodes(List<ValueDTO> illnessCodes) {
    this.illnessCodes = illnessCodes;
    if (illnessCodes != null) {
      illnessCodeToName = illnessCodes.stream().distinct()
                            .collect(Collectors.toMap(ValueDTO::getCode, ValueDTO::getName));
    }
  }

  public void setMedicalProblemCodes(List<ValueDTO> medicalProblemCodes) {
    this.medicalProblemCodes = medicalProblemCodes;
    if (medicalProblemCodes != null) {
      medicalProblemCodeToName = medicalProblemCodes.stream().distinct()
                                  .collect(Collectors.toMap(ValueDTO::getCode, ValueDTO::getName));
    }
  }

  public void setVaccineCodes(List<ValueDTO> vaccineCodes) {
    this.vaccineCodes = vaccineCodes;
    if(vaccineCodes != null) {
      vaccineCodeToName = vaccineCodes.stream().distinct()
                            .collect(Collectors.toMap(ValueDTO::getCode, ValueDTO::getName));
    }
  }
}
