import styled from "styled-components";

export const Container = styled.div`
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #fafafa;
    border-radius: 24px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h1`
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 2rem;
    color: #1a1a1a;
    letter-spacing: -0.01em;
`;

export const Section = styled.div`
    margin-bottom: 1.75rem;
`;

export const Label = styled.label`
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #555;
    margin-bottom: 0.5rem;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.9rem 1rem;
    font-size: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    background: white;
    transition: all 0.2s ease;
    font-family: 'Fira Code', 'Courier New', monospace;

    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 0.9rem 1rem;
    font-size: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    background: white;
    min-height: 100px;
    resize: vertical;
    font-family: 'Fira Code', 'Courier New', monospace;

    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
`;

export const Select = styled.select`
    width: 100%;
    padding: 0.9rem 1rem;
    font-size: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    background: white;
    cursor: pointer;
    font-family: inherit;

    &:focus {
        outline: none;
        border-color: #3b82f6;
    }
`;

export const GammaBox = styled.div`
    background: #f0f0f0;
    padding: 1rem;
    border-radius: 16px;
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 0.95rem;
    color: #2c3e50;
    word-break: break-all;
    min-height: 60px;
    border: 1px solid #e6e6e6;
`;

export const Row = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    & > * {
        flex: 1;
    }
`;

export const FooterNote = styled.div`
    margin-top: 2rem;
    font-size: 0.75rem;
    color: #aaa;
    text-align: center;
    border-top: 1px solid #eee;
    padding-top: 1.5rem;
`;

export const LinkSection = styled.div`
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    text-align: center;
`;

export const GithubLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    background: #f5f5f5;
    color: #24292e;
    text-decoration: none;
    border-radius: 24px;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.2s ease;
    font-family: inherit;
    border: 1px solid #e0e0e0;

    &:hover {
        background: #e8e8e8;
        border-color: #3b82f6;
        transform: translateY(-1px);
    }

    svg {
        width: 18px;
        height: 18px;
        fill: #24292e;
    }
`;

export const CodeBadge = styled.span`
    background: #e8e8e8;
    color: #555;
    padding: 0.2rem 0.6rem;
    border-radius: 12px;
    font-size: 0.7rem;
    font-family: 'Fira Code', monospace;
    margin-left: 0.5rem;
    border: 1px solid #d0d0d0;
`;

export const PageContainer = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    padding: 2rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #fafafa;
    border-radius: 24px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
`;

export const NavBar = styled.nav`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
`;

export const GraphContainer = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid #e0e0e0;
    margin-bottom: 2rem;
`;

export const GraphTitle = styled.h3`
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1a1a1a;
`;

export const BarChart = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 200px;
    margin: 1rem 0;
`;

export const Bar = styled.div<{ $height: number; $isMax?: boolean }>`
    flex: 1;
    height: ${props => props.$height}%;
    background: ${props => props.$isMax ? '#3b82f6' : '#cbd5e1'};
    transition: height 0.3s ease;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

export const XAxis = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 0.5rem;
    font-size: 0.7rem;
    color: #888;
`;

export const KeyLengthDisplay = styled.div`
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    padding: 1rem;
    border-radius: 16px;
    text-align: center;
    margin-bottom: 2rem;

    h2 {
        font-size: 2rem;
        margin: 0;
        font-weight: 600;
    }

    p {
        margin: 0.5rem 0 0;
        font-size: 0.85rem;
        opacity: 0.9;
    }
`;

export const KeyPositionSelector = styled.div`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
`;

export const KeyPositionButton = styled.button<{ $active?: boolean }>`
    padding: 0.5rem 1rem;
    background: ${props => props.$active ? '#3b82f6' : '#f0f0f0'};
    color: ${props => props.$active ? 'white' : '#555'};
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.2s ease;
    font-family: 'Fira Code', monospace;

    &:hover {
        background: ${props => props.$active ? '#3b82f6' : '#e0e0e0'};
    }
`;

export const GuessedKeyDisplay = styled.div`
    background: #f0fdf4;
    border: 1px solid #86efac;
    border-radius: 16px;
    padding: 1rem;
    margin: 1rem 0;

    .key {
        font-family: 'Fira Code', monospace;
        font-size: 1.2rem;
        font-weight: 600;
        color: #166534;
        letter-spacing: 2px;
    }

    .label {
        font-size: 0.75rem;
        color: #15803d;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        font-weight: 600;
    }
`;

export const ResultSection = styled.div`
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
`;

export const TwoColumnLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const FrequencyChart = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 4px;
    height: 150px;
    margin: 1rem 0;
`;

export const FreqBar = styled.div<{ $height: number; $expectedHeight?: number }>`
    flex: 1;
    height: ${props => props.$height}%;
    background: #3b82f6;
    position: relative;
    transition: height 0.3s ease;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: ${props => props.$expectedHeight || 0}%;
        background: rgba(239, 68, 68, 0.3);
        z-index: 1;
    }
`;

export const Legend = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.7rem;

    span {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
    }

    .actual {
        color: #3b82f6;
    }

    .expected {
        color: #ef4444;
    }
`;

