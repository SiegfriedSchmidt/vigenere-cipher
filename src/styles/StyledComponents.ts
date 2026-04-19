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
