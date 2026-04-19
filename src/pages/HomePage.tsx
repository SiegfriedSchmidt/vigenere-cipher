import React, {useState, useMemo} from 'react';
import type {CipherMode, GammaMode} from "../types/general.ts";
import {
  Container,
  FooterNote,
  GammaBox,
  Input,
  Label,
  Row,
  Section,
  Select,
  TextArea,
  Title
} from "../styles/StyledComponents.ts";
import {vigenere, cleanText} from "../crypto/vigenere.ts";

const HomePage: React.FC = () => {
  const [message, setMessage] = useState<string>('HELLO');
  const [secretKey, setSecretKey] = useState<string>('KEY');
  const [cipherMode, setCipherMode] = useState<CipherMode>('encrypt');
  const [gammaMode, setGammaMode] = useState<GammaMode>('repeat');

  const {cipherText, gamma} = useMemo(
    () => {
      if (!message.trim() || !secretKey.trim()) {
        return {cipherText: "", gamma: ""}
      }
      return vigenere(message, secretKey, cipherMode, gammaMode)
    }
    , [message, secretKey, cipherMode, gammaMode]
  );

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(cleanText(e.target.value));
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecretKey(cleanText(e.target.value));
  };

  return (
    <Container>
      <Title>Шифр Виженера</Title>

      <Section>
        <Label>Сообщение (только буквы A-Z)</Label>
        <TextArea
          value={message}
          onChange={handleMessageChange}
          placeholder="Введите сообщение..."
        />
      </Section>

      <Section>
        <Label>🔑 Секретный ключ</Label>
        <Input
          type="text"
          value={secretKey}
          onChange={handleKeyChange}
          placeholder="Ключ (только буквы)"
        />
      </Section>

      <Row>
        <Section>
          <Label>⚙️ Режим</Label>
          <Select
            value={cipherMode}
            onChange={(e) => setCipherMode(e.target.value as CipherMode)}
          >
            <option value="encrypt">🔒 Шифрование</option>
            <option value="decrypt">🔓 Расшифрование</option>
          </Select>
        </Section>

        <Section>
          <Label>🎲 Генерация гаммы</Label>
          <Select
            value={gammaMode}
            onChange={(e) => setGammaMode(e.target.value as GammaMode)}
          >
            <option value="repeat">Повторение ключа</option>
            <option value="autokey-plain">Самоключ по открытому тексту</option>
            <option value="autokey-cipher">Самоключ по шифртексту</option>
          </Select>
        </Section>
      </Row>

      <Section>
        <Label>Сгенерированная гамма</Label>
        <GammaBox>
          {gamma || '(нет данных)'}
        </GammaBox>
      </Section>

      <Section>
        <Label>{cipherMode === 'encrypt' ? 'Шифротекст' : 'Расшифрованный текст'}</Label>
        <TextArea
          value={cipherText}
          readOnly
          placeholder="Результат появится здесь..."
        />
      </Section>

      <FooterNote>
        Только латинские буквы A-Z. Остальное будет игнорироваться.
      </FooterNote>
    </Container>
  );
};

export default HomePage;