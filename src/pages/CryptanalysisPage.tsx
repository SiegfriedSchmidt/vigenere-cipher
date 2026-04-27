import React, {useState, useMemo, useCallback} from 'react';
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
  ChartWrapper,
  AverageLine,
  GraphSubtitle,
  GraphsContainer, LinkSection, GithubLink, CodeBadge
} from '../styles/StyledComponents';
import {cleanText, vigenere} from '../crypto/vigenere.ts';
import {CryptoAnalyzer} from '../crypto/CryptoAnalyzer.ts';
import {ALPHABET, ENGLISH_FREQ, GITHUB_ALGORITHM2_URL} from "../types/constants.ts";

const CryptanalysisPage: React.FC = () => {
  const [ciphertext, setCiphertext] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<number>(0);
  const [manualKeyLength, setManualKeyLength] = useState<number | null>(null);
  const [distributionType, setDistributionType] = useState<'shifted' | 'separated'>('shifted');

  const {cryptoAnalyzer, decryptedText} = useMemo(() => {
    const cryptoAnalyzer = new CryptoAnalyzer(ciphertext);

    if (manualKeyLength) {
      cryptoAnalyzer.analyze(manualKeyLength)
    } else {
      cryptoAnalyzer.analyze()
    }

    const decryptedText = vigenere(ciphertext, cryptoAnalyzer.guessedKey, "decrypt", "repeat").cipherText;

    return {cryptoAnalyzer, decryptedText};
  }, [ciphertext, manualKeyLength]);

  const handleBarClick = useCallback((length: number) => {
    setManualKeyLength(length === manualKeyLength ? null : length);
  }, [manualKeyLength]);

  return (
    <PageContainer>
      <Section>
        <Label>Зашифрованный текст ({ciphertext.length})</Label>
        <TextArea
          value={ciphertext}
          onChange={(e) => {
            setCiphertext(cleanText(e.target.value));
            setManualKeyLength(null);
          }}
          placeholder="Введите шифротекст для взлома..."
        />
      </Section>

      {cryptoAnalyzer.ICResults.length > 0 && (
        <GraphContainer>
          <GraphTitle>Индекс совпадения для разных длин ключа</GraphTitle>
          <GraphSubtitle>Кликните на любой столбец, чтобы выбрать длину ключа вручную</GraphSubtitle>
          <ChartWrapper>
            <BarChart>
              {cryptoAnalyzer.ICResults.map((result) => (
                <Bar
                  key={result.length}
                  $height={(result.ic / cryptoAnalyzer.maxIC) * 100}
                  $isMax={result.length === cryptoAnalyzer.keyLength && !manualKeyLength}
                  $isSelected={result.length === manualKeyLength}
                  onClick={() => handleBarClick(result.length)}
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
            <p>
              {manualKeyLength ? 'Ручной выбор' : 'Предполагаемая длина ключа'}
            </p>
            <h2>{manualKeyLength || cryptoAnalyzer.keyLength}</h2>
            {manualKeyLength && (
              <button
                onClick={() => setManualKeyLength(null)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '0.7rem',
                  marginTop: '0.5rem'
                }}
              >
                Сбросить на авто
              </button>
            )}
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

            <div style={{display: 'flex', gap: '0.5rem', margin: '1rem 0', justifyContent: 'center'}}>
              <button
                onClick={() => setDistributionType('separated')}
                style={{
                  padding: '0.4rem 1rem',
                  background: distributionType === 'separated' ? '#3b82f6' : '#f0f0f0',
                  color: distributionType === 'separated' ? 'white' : '#555',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  transition: 'all 0.2s'
                }}
              >
                До сдвига
              </button>
              <button
                onClick={() => setDistributionType('shifted')}
                style={{
                  padding: '0.4rem 1rem',
                  background: distributionType === 'shifted' ? '#3b82f6' : '#f0f0f0',
                  color: distributionType === 'shifted' ? 'white' : '#555',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  transition: 'all 0.2s'
                }}
              >
                После сдвига
              </button>
            </div>

            <GraphsContainer>
              <GraphContainer>
                {distributionType === 'shifted' ?
                  <>
                    <GraphTitle>
                      Фактическое распределение
                      (сдвиг {cryptoAnalyzer.shiftedDistributions.get(selectedPosition)?.shift})
                    </GraphTitle>
                    <GraphSubtitle>
                      После применения предполагаемого сдвига ключа
                    </GraphSubtitle>
                    <FrequencyChart>
                      {cryptoAnalyzer.shiftedDistributions.get(selectedPosition)?.dist.map((freq, idx) => (
                        <FreqBar
                          key={idx}
                          $height={freq * 100}
                        />
                      ))}
                    </FrequencyChart>
                  </> :
                  <>
                    <GraphTitle>
                      Фактическое распределение (без сдвига)
                    </GraphTitle>
                    <GraphSubtitle>
                      Исходное распределение
                    </GraphSubtitle>
                    <FrequencyChart>
                      {cryptoAnalyzer.separatedDistributions.get(selectedPosition)?.map((freq, idx) => (
                        <FreqBar
                          key={idx}
                          $height={freq * 100}
                        />
                      ))}
                    </FrequencyChart>
                  </>
                }

                <XAxis>
                  {ALPHABET.split('').map(letter => (
                    <span key={letter}>{letter}</span>
                  ))}
                </XAxis>
              </GraphContainer>

              <GraphContainer>
                <GraphTitle>Ожидаемое распределение</GraphTitle>
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
              <TextArea
                value={decryptedText || '(нет данных)'}
                readOnly
                placeholder="Расшифрованный текст появится здесь..."
              />
            </Section>
          </ResultSection>
        </>
      )}
      <LinkSection>
        <GithubLink
          href={GITHUB_ALGORITHM2_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          Посмотреть алгоритм на GitHub
          <CodeBadge>CryptoAnalyzer.ts</CodeBadge>
        </GithubLink>
      </LinkSection>
    </PageContainer>
  );
};

export default CryptanalysisPage;