class WordAnalyzer {
  private documentInput: HTMLInputElement;
  private resultDiv: HTMLDivElement;

  constructor() {
    this.documentInput = document.getElementById('documentInput') as HTMLInputElement;
    this.resultDiv = document.getElementById('result') as HTMLDivElement;
  }

  private isTextFile(file: File): boolean {
    return file.name.toLowerCase().endsWith('.txt');
  }

  private readDocument(callback: (content: string) => void): void {
    const file = this.documentInput.files?.[0];

    if (!file) {
      alert('Please upload a file.');
      return;
    }

    if (!this.isTextFile(file)) {
      alert('Please upload a Text document with a .txt extension.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const content = event.target.result as string;
        callback(content);
      }
    };

    reader.onerror = (event) => {
      alert('Error reading the file.');
      console.error(event);
    };

    reader.readAsText(file);
  }

  private analyzeLetters(content: string): void {
    const letterCounts: Record<string, number> = {};

    for (const char of content) {
      if (/[a-zA-Z]/.test(char)) {
        const upperCaseChar = char.toUpperCase();
        letterCounts[upperCaseChar] = (letterCounts[upperCaseChar] || 0) + 1;
      }
    }

    const maxLetter = Object.keys(letterCounts).reduce((a, b) => letterCounts[a] > letterCounts[b] ? a : b);

    const result = `Maximum Occurring Letter: ${maxLetter}\nLetter Counts: ${JSON.stringify(letterCounts)}`;
    this.resultDiv.innerText = result;
  }

  private analyzePalindromes(content: string): void {
    const modifiedContent = content.replace(/\b(\w+)\b/g, (match, word) => {
      return word === word.split('').reverse().join('') ? '*'.repeat(word.length) : word;
    });

    this.resultDiv.innerText = `Modified Content:\n${modifiedContent}`;
  }

  analyzeLettersButtonClick = (): void => {
    this.readDocument(this.analyzeLetters);
  };

  analyzePalindromeButtonClick = (): void => {
    this.readDocument(this.analyzePalindromes);
  };
}

const wordAnalyzer = new WordAnalyzer();

document.getElementById('analyzeLettersButton')?.addEventListener('click', wordAnalyzer.analyzeLettersButtonClick);
document.getElementById('analyzePalindromeButton')?.addEventListener('click', wordAnalyzer.analyzePalindromeButtonClick);
