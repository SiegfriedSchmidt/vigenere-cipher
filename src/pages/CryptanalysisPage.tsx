import React, {useState, useMemo} from 'react';
import {
  PageContainer,
  GraphContainer,
  GraphTitle,
  BarChart,
  Bar,
  XAxis,
  KeyLengthDisplay,
  KeyPositionSelector,
  KeyPositionButton,
  GuessedKeyDisplay,
  ResultSection,
  Section,
  Label,
  TextArea,
  FrequencyChart,
  FreqBar,
  GammaBox, ChartWrapper, AverageLine, GraphSubtitle, GraphsContainer
} from '../styles/StyledComponents';
import {cleanText, vigenere} from '../crypto/vigenere.ts';
import {CryptoAnalyzer} from '../crypto/CryptoAnalyzer.ts';
import {ALPHABET, ENGLISH_FREQ} from "../types/constants.ts";

const CryptanalysisPage: React.FC = () => {
  const [ciphertext, setCiphertext] = useState<string>('CRYPTO');
  const [selectedPosition, setSelectedPosition] = useState<number>(0);

  const {cryptoAnalyzer, decryptedText} = useMemo(() => {
    const cryptoAnalyzer = new CryptoAnalyzer(ciphertext)
    cryptoAnalyzer.analyze()
    const decryptedText = vigenere(ciphertext, cryptoAnalyzer.guessedKey, "decrypt", "repeat").cipherText;
    return {cryptoAnalyzer, decryptedText};
  }, [ciphertext]);

  return (
    <PageContainer>
      <Section>
        <Label>Зашифрованный текст</Label>
        <TextArea
          value={ciphertext}
          onChange={(e) => setCiphertext(cleanText(e.target.value))}
          placeholder="Введите шифротекст для взлома..."
        />
      </Section>

      {cryptoAnalyzer.ICResults.length > 0 && (
        <GraphContainer>
          <GraphTitle>Индекс совпадения для разных длин ключа</GraphTitle>
          <ChartWrapper>
            <BarChart>
              {cryptoAnalyzer.ICResults.map((result) => (
                <Bar
                  key={result.length}
                  $height={(result.ic / cryptoAnalyzer.maxIC) * 100}
                  $isMax={result.length === cryptoAnalyzer.keyLength}
                />
              ))}
            </BarChart>
            <AverageLine
              $topPercent={Math.round((cryptoAnalyzer.averageIC / cryptoAnalyzer.maxIC) * 100)}
              $average={Math.round(cryptoAnalyzer.averageIC * 1000) / 1000}
            />
          </ChartWrapper>
          <XAxis>
            {cryptoAnalyzer.ICResults.map((result) => (
              <span key={result.length}>{result.length}</span>
            ))}
          </XAxis>
        </GraphContainer>
      )}

      {cryptoAnalyzer.keyLength > 0 && (
        <>
          <KeyLengthDisplay>
            <p>Предполагаемая длина ключа</p>
            <h2>{cryptoAnalyzer.keyLength}</h2>
          </KeyLengthDisplay>

          <GuessedKeyDisplay>
            <div className="label">🔑 Найденный ключ</div>
            <div className="key">{cryptoAnalyzer.guessedKey}</div>
          </GuessedKeyDisplay>

          <Section>
            <Label>Частотный анализ для каждой позиции ключа</Label>
            <KeyPositionSelector>
              {Array.from({length: cryptoAnalyzer.keyLength}, (_, i) => (
                <KeyPositionButton
                  key={i}
                  $active={selectedPosition === i}
                  onClick={() => setSelectedPosition(i)}
                >
                  Позиция {i + 1}: {cryptoAnalyzer.guessedKey[i]}
                </KeyPositionButton>
              ))}
            </KeyPositionSelector>

            <GraphsContainer>
              <GraphContainer>
                <GraphTitle>Фактическое распределение
                  (сдвиг {cryptoAnalyzer.shiftedDistributions.get(selectedPosition)?.shift})
                </GraphTitle>
                <GraphSubtitle>После применения предполагаемого сдвига ключа</GraphSubtitle>
                <FrequencyChart>
                  {cryptoAnalyzer.shiftedDistributions.get(selectedPosition)?.dist.map((freq, idx) => (
                    <FreqBar
                      key={idx}
                      $height={freq * 100}
                    />
                  ))}
                </FrequencyChart>
                <XAxis>
                  {ALPHABET.split('').map(letter => (
                    <span key={letter}>{letter}</span>
                  ))}
                </XAxis>
              </GraphContainer>

              <GraphContainer>
                <GraphTitle>Ожидаемое распределение (английский язык)</GraphTitle>
                <GraphSubtitle>Эталонное распределение букв</GraphSubtitle>
                <FrequencyChart>
                  {ENGLISH_FREQ.map((freq, idx) => (
                    <FreqBar
                      key={idx}
                      $height={freq * 100}
                    />
                  ))}
                </FrequencyChart>
                <XAxis>
                  {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                    <span key={letter}>{letter}</span>
                  ))}
                </XAxis>
              </GraphContainer>
            </GraphsContainer>
          </Section>

          <ResultSection>
            <Section>
              <Label>Расшифрованный текст</Label>
              <GammaBox style={{minHeight: '150px', whiteSpace: 'pre-wrap'}}>
                {decryptedText || '(нет данных)'}
              </GammaBox>
            </Section>
          </ResultSection>
        </>
      )}
    </PageContainer>
  );
};

export default CryptanalysisPage;
