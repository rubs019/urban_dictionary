<template>
  <div class="inscription-page">
    <div class="_wpwi48">
      <div class="_152qbzi">
        <button
          type="button"
          class="_1rp5252"
          aria-busy="false"
          style="padding: 0px; margin: 0px;"
        >
          <svg
            viewBox="0 0 24 24"
            role="img"
            aria-label="Fermer"
            focusable="false"
            style="height: 16px; width: 16px; display: block; fill: rgb(118, 118, 118);"
          >
            <path
              d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22"
              fill-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <section>
        <section>
          <div>
            <div style="margin-bottom: 8px;">
              <form
                action="/oauth_connect?from=facebook_login&amp;service=facebook"
                method="POST"
              >
                <input
                  type="hidden"
                  name="authenticity_token"
                  value="V4$.airbnb.fr$PQYnDmJwd5A$PH3nDlOpNuZ1kX0vDxxu9DhGHVV3fKF6tQgb76zfCy0="
                />
                <button type="submit" class="_1ntwpwu9" aria-busy="false">
                  <span class="_1cjbe3z7"
                    ><div class="_qtix31" style="margin: 0px auto;">
                      <div class="_ni9axhe">
                        <div style="margin-right: 12px;">
                          <svg
                            viewBox="0 0 32 32"
                            role="presentation"
                            aria-hidden="true"
                            focusable="false"
                            style="height: 18px; width: 18px; display: block; fill: currentcolor;"
                          >
                            <path
                              d="m8 14.41v-4.17c0-.42.35-.81.77-.81h2.52v-2.08c0-4.84 2.48-7.31 7.42-7.35 1.65 0 3.22.21 4.69.64.46.14.63.42.6.88l-.56 4.06c-.04.18-.14.35-.32.53-.21.11-.42.18-.63.14-.88-.25-1.78-.35-2.8-.35-1.4 0-1.61.28-1.61 1.73v1.8h4.52c.42 0 .81.42.81.88l-.35 4.17c0 .42-.35.71-.77.71h-4.21v16c0 .42-.35.81-.77.81h-5.21c-.42 0-.8-.39-.8-.81v-16h-2.52a.78.78 0 0 1 -.78-.78"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div class="_ni9axhe">Connexion avec Facebook</div>
                    </div></span
                  >
                </button>
              </form>
            </div>
            <form
              action="/oauth_connect?from=google_login&amp;service=google"
              method="POST"
            >
              <input
                type="hidden"
                name="authenticity_token"
                value="V4$.airbnb.fr$PQYnDmJwd5A$PH3nDlOpNuZ1kX0vDxxu9DhGHVV3fKF6tQgb76zfCy0="
              />
              <button type="submit" class="_1p8o9c7j" aria-busy="false">
                <span class="_1cjbe3z7"
                  ><div class="_qtix31" style="margin: 0px auto;">
                    <div class="_ni9axhe">
                      <div style="margin-right: 12px;">
                        <svg
                          viewBox="0 0 18 18"
                          role="presentation"
                          aria-hidden="true"
                          focusable="false"
                          style="height: 18px; width: 18px; display: block;"
                        >
                          <g fill="none" fill-rule="evenodd">
                            <path
                              d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
                              fill="#EA4335"
                            ></path>
                            <path
                              d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
                              fill="#4285F4"
                            ></path>
                            <path
                              d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
                              fill="#FBBC05"
                            ></path>
                            <path
                              d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
                              fill="#34A853"
                            ></path>
                            <path d="M0 0h18v18H0V0z"></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div class="_ni9axhe">Connexion avec Google</div>
                  </div></span
                >
              </button>
            </form>
          </div>
          <div>
            <div style="margin-top: 16px; margin-bottom: 16px;">
              <div class="_12j61cy">
                <span class="_1ish1khj"><span class="_1rbmiub1">ou</span></span>
              </div>
            </div>
            <form action="/authenticate" method="POST" novalidate="">
              <input
                type="hidden"
                name="authenticity_token"
                value="V4$.airbnb.fr$PQYnDmJwd5A$PH3nDlOpNuZ1kX0vDxxu9DhGHVV3fKF6tQgb76zfCy0="
              />
              <div>
                <div style="margin-bottom: 16px;">
                  <input type="hidden" name="from" value="email_login" />
                </div>
                <div style="margin-bottom: 16px;">
                  <input type="hidden" name="airlock_id" value="" />
                </div>
                <div style="margin-bottom: 16px;">
                  <div class="inspectletIgnore">
                    <div class="_9hxttoo">
                      <label class="_1m8bb6v" for="email-login-email"
                        >Adresse e-mail</label
                      >
                      <div dir="ltr">
                        <div class="_1wcr140x">
                          <div class="_107ja4p">
                            <div
                              class="_1lmb7hx"
                              style="visibility: visible; height: 46px;"
                            >
                              <div class="_nncr1bm">
                                <div class="_ni9axhe">
                                  <svg
                                    viewBox="0 0 24 24"
                                    role="presentation"
                                    aria-hidden="true"
                                    focusable="false"
                                    style="height: 1em; width: 1em; display: block; fill: currentcolor;"
                                  >
                                    <path
                                      d="m22.5 4h-21c-.83 0-1.5.67-1.5 1.51v12.99c0 .83.67 1.5 1.5 1.5h20.99a1.5 1.5 0 0 0 1.51-1.51v-12.98c0-.84-.67-1.51-1.5-1.51zm.5 14.2-6.14-7.91 6.14-4.66v12.58zm-.83-13.2-9.69 7.36c-.26.2-.72.2-.98 0l-9.67-7.36h20.35zm-21.17.63 6.14 4.67-6.14 7.88zm.63 13.37 6.3-8.1 2.97 2.26c.62.47 1.57.47 2.19 0l2.97-2.26 6.29 8.1z"
                                      fill-rule="evenodd"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="_178faes">
                            <input
                              type="email"
                              autocomplete="username"
                              class="_14fdu48d"
                              id="email-login-email"
                              name="email"
                              placeholder="Adresse e-mail"
                              value=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="margin-bottom: 16px;">
                  <div>
                    <div class="_9hxttoo">
                      <label class="_1m8bb6v" for="email-login-password"
                        >Mot de passe</label
                      >
                      <div dir="ltr">
                        <div class="_1wcr140x">
                          <div class="_107ja4p">
                            <div
                              class="_1lmb7hx"
                              style="visibility: visible; height: 46px;"
                            >
                              <div class="_nncr1bm">
                                <div class="_ni9axhe">
                                  <svg
                                    viewBox="0 0 24 24"
                                    role="presentation"
                                    aria-hidden="true"
                                    focusable="false"
                                    style="height: 1em; width: 1em; display: block; fill: currentcolor;"
                                  >
                                    <path
                                      d="m19.5 9h-.5v-2a7 7 0 1 0 -14 0v2h-.5c-.78 0-1.5.72-1.5 1.5v12c0 .78.72 1.5 1.5 1.5h15c .78 0 1.5-.72 1.5-1.5v-12c0-.78-.72-1.5-1.5-1.5zm.5 13.5c0 .22-.28.5-.5.5h-15c-.22 0-.5-.28-.5-.5v-12c0-.22.28-.5.5-.5h1a .5.5 0 0 0 .5-.5v-2.5a6 6 0 1 1 12 0v2.5a.5.5 0 0 0 .5.5h1c .22 0 .5.28.5.5zm-8-10.5a3 3 0 0 0 -3 3c0 .83.36 1.59.94 2.15l-.9 2.16a.5.5 0 0 0 .46.69h5a .5.5 0 0 0 .46-.69l-.87-2.19c.56-.55.91-1.31.91-2.13a3 3 0 0 0 -3-3zm1.04 5.19.72 1.81h-3.51l.74-1.79a.5.5 0 0 0 -.17-.6 2 2 0 1 1 3.18-1.61c0 .64-.31 1.24-.8 1.6a.5.5 0 0 0 -.17.59zm-1.04-14.19a4 4 0 0 0 -4 4v2.5a.5.5 0 0 0 .5.5h7a .5.5 0 0 0 .5-.5v-2.5a4 4 0 0 0 -4-4zm3 6h-6v-2a3 3 0 1 1 6 0z"
                                      fill-rule="evenodd"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="_178faes">
                            <input
                              type="password"
                              autocomplete="off"
                              class="_14fdu48d"
                              id="email-login-password"
                              name="password"
                              placeholder="Mot de passe"
                              value=""
                              autocapitalize="none"
                              autocorrect="off"
                              spellcheck="false"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="margin-bottom: 16px;">
                  <div class="va-container va-container-h">
                    <div class="va-middle">
                      <label
                        class="_rin72m"
                        for="email-login-remember-me-checkbox"
                      >
                        <div class="_hgs47m">
                          <div class="_1thk0tsb">
                            <div class="_aaxh23">
                              <span class="_foa2bi"
                                ><input
                                  type="checkbox"
                                  class="_1646mkx"
                                  aria-invalid="false"
                                  id="email-login-remember-me-checkbox"
                                  name="remember_me"
                                  value="1"/><span
                                  data-fake-checkbox="true"
                                  data-style-select="false"
                                  data-style-default="true"
                                  class="_fhj4ui"
                                ></span
                              ></span>
                            </div>
                          </div>
                          <div class="_n5lh69r">
                            <div class="_1rqlddm">
                              <span class="_be8n6e">Se souvenir de moi</span>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                    <div class="pull-right va-middle">
                      <button type="button" class="_pgfpyhv" aria-busy="false">
                        Afficher le mot de passe
                      </button>
                    </div>
                  </div>
                </div>
                <div style="margin-bottom: 16px;">
                  <div id="airlock-inline-container"></div>
                </div>
                <div style="margin-bottom: 16px;">
                  <button type="submit" class="_taglxzq" aria-busy="false">
                    <span class="_ftj2sg4">Connexion</span>
                  </button>
                </div>
                <div class="text-center">
                  <div class="_czm8crp">
                    <div class="_121z06r2">
                      <a
                        href="/forgot_password"
                        class="_15da8x1u"
                        aria-busy="false"
                        >Mot de passe oublié&nbsp;?</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div style="margin-top: 16px; margin-bottom: 16px;">
            <div class="_7qp4lh"></div>
          </div>
          <div class="va-container va-container-h">
            <span class="va-middle text-center"
              ><span class="_czm8crp">Vous n'avez pas de compte ?</span>
              <div class="_36rlri" style="margin-left: 8px; margin-right: 8px;">
                <span class="_1p3joamp"
                  ><a href="/signup_login?" class="_15da8x1u" aria-busy="false"
                    >Inscription</a
                  ></span
                >
              </div></span
            >
          </div>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "InscriptionPage"
}
</script>

<style scoped></style>
