import { parseWebAuthnAuthenticateText, parseWebAuthnRegisterText } from './script-parser';
import {
  authenticateInputWithRpidAndAllowCredentials,
  authenticateInputWithRpidAllowCredentialsAndQuotes,
  authenticateInputWithoutRpidAndAllowCredentials,
  registerInputWithRpid,
  registerInputWithRpidAndQuotes,
  registerOutputWithRpid,
  registerInputWithoutRpid,
  registerOutputWithoutRpid,
} from './script-text.mock.data';

describe('Parsing of the WebAuthn script type text', () => {
  it('should parse the WebAuthn authenticate block of text with rpid and allow credentials', () => {
    const obj = parseWebAuthnAuthenticateText(authenticateInputWithRpidAndAllowCredentials);
    expect(obj.allowCredentials[0].type).toBe('public-key');
    expect(obj.allowCredentials[0].id.byteLength > 0).toBe(true);
    expect(obj.challenge.byteLength > 0).toBe(true);
    expect(obj.timeout).toBe(60000);
    expect(obj.rpId).toBe('example.com');
  });

  it('should parse the WebAuthn authenticate block of text with quoted keys', () => {
    const obj = parseWebAuthnAuthenticateText(authenticateInputWithRpidAllowCredentialsAndQuotes);
    expect(obj.allowCredentials[0].type).toBe('public-key');
    expect(obj.allowCredentials[0].id.byteLength > 0).toBe(true);
    expect(obj.challenge.byteLength > 0).toBe(true);
    expect(obj.timeout).toBe(60000);
    expect(obj.rpId).toBe('example.com');
  });

  it('should parse the WebAuthn authenticate block of text', () => {
    const obj = parseWebAuthnAuthenticateText(authenticateInputWithoutRpidAndAllowCredentials);
    expect(obj.allowCredentials).toBe(undefined);
    expect(obj.rpId).toBe(undefined);
  });

  it('should parse the WebAuthn register block of text with rpid', () => {
    const obj = parseWebAuthnRegisterText(registerInputWithRpid);
    expect(obj.attestation).toBe(registerOutputWithRpid.attestation);
    expect(obj.authenticatorSelection).toStrictEqual(registerOutputWithRpid.authenticatorSelection);
    expect(obj.challenge.byteLength > 0).toBe(true);
    expect(obj.pubKeyCredParams).toStrictEqual(registerOutputWithRpid.pubKeyCredParams);
    expect(obj.rp).toStrictEqual(registerOutputWithRpid.rp);
    expect(obj.timeout).toBe(registerOutputWithRpid.timeout);
    expect(obj.user.displayName).toStrictEqual(registerOutputWithRpid.user.displayName);
    expect(obj.user.name).toBe(registerOutputWithRpid.user.name);
    expect(obj.user.id.byteLength > 0).toBe(true);
  });

  it('should parse the WebAuthn register block of text with rpid and quoted keys', () => {
    const obj = parseWebAuthnRegisterText(registerInputWithRpidAndQuotes);
    expect(obj.attestation).toBe(registerOutputWithRpid.attestation);
    expect(obj.authenticatorSelection).toStrictEqual(registerOutputWithRpid.authenticatorSelection);
    expect(obj.challenge.byteLength > 0).toBe(true);
    expect(obj.pubKeyCredParams).toStrictEqual(registerOutputWithRpid.pubKeyCredParams);
    expect(obj.rp).toStrictEqual(registerOutputWithRpid.rp);
    expect(obj.timeout).toBe(registerOutputWithRpid.timeout);
    expect(obj.user.displayName).toStrictEqual(registerOutputWithRpid.user.displayName);
    expect(obj.user.name).toBe(registerOutputWithRpid.user.name);
    expect(obj.user.id.byteLength > 0).toBe(true);
  });

  it('should parse the WebAuthn register block of text withOUT rpid', () => {
    const obj = parseWebAuthnRegisterText(registerInputWithoutRpid);
    expect(obj.rp).toStrictEqual(registerOutputWithoutRpid.rp);
  });
});
