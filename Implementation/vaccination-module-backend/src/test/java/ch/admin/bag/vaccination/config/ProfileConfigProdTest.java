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
package ch.admin.bag.vaccination.config;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {"SPRING_CLOUDPROFILES_ACTIVE=prod", "LOCALMODE=false", "HUSKYLOCALMODE=false"})
@EnableAutoConfiguration
public class ProfileConfigProdTest {
  @Autowired
  private ProfileConfig profileConfig;

  @Test
  public void testLocalMode() {
    boolean initialValue = profileConfig.isLocalMode();
    profileConfig.setLocalMode(true);
    assertEquals(initialValue, profileConfig.isLocalMode());
    profileConfig.setLocalMode(false);
    assertEquals(initialValue, profileConfig.isLocalMode());
  }

  @Test
  public void testSamlAuthenticationActive() {
    assertThat(profileConfig.isSamlAuthenticationActive()).isTrue();
    profileConfig.setSamlAuthenticationActive(false);
    assertThat(profileConfig.isSamlAuthenticationActive()).isTrue();
  }

}
