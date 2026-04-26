import React, {useState, useMemo} from 'react';
import type {CipherMode, GammaMode} from "../types/general.ts";
import {
  CodeBadge,
  Container,
  FooterNote,
  GithubLink,
  Input,
  Label, LinkSection,
  Row,
  Section,
  Select,
  TextArea,
  Title
} from "../styles/StyledComponents.ts";
import {vigenere, cleanText} from "../crypto/vigenere.ts";

const GITHUB_ALGORITHM_URL = "https://github.com/SiegfriedSchmidt/vigenere-cipher/blob/main/src/crypto/vigenere.ts"

const HomePage: React.FC = () => {
  const [message, setMessage] = useState<string>('CRYPTO');
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
        <TextArea
          value={gamma || '(нет данных)'}
          readOnly
          placeholder="Гамма появится здесь..."
        />
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
        Только латинские заглавные буквы A-Z. Остальное будет игнорироваться.
      </FooterNote>

      <LinkSection>
        <GithubLink
          href={GITHUB_ALGORITHM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          Посмотреть алгоритм на GitHub
          <CodeBadge>vigenere.ts</CodeBadge>
        </GithubLink>
      </LinkSection>
    </Container>
  );
};

export default HomePage;