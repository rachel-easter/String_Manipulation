class WordAnalyzer {
  private documentInput: HTMLInputElement;
  private resultDiv: HTMLDivElement;

  constructor() {
    this.documentInput = document.getElementById('documentInput') as HTMLInputElement;
    this.resultDiv = document.getElementById('result') as HTMLDivElement;
  }

  private readDocument(callback: (content: string) => void): void {
    const file = this.documentInput.files?.[0];

    if (!file) {
      alert('Please upload a Text document.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const content = event.target.result as string;
        callback(content);
      }
    };

    reader.readAsText(file);
  }

  analyzeLetters = (): void => {
    this.readDocument((documentContent) => {
      const letterCounts: Record<string, number> = {};

      for (const char of documentContent) {
        if (/[a-zA-Z]/.test(char)) {
          const upperCaseChar = char.toUpperCase();
          letterCounts[upperCaseChar] = (letterCounts[upperCaseChar] || 0) + 1;
        }
      }

      const maxLetter = Object.keys(letterCounts).reduce((a, b) => letterCounts[a] > letterCounts[b] ? a : b);

      const result = `Maximum Occurring Letter: ${maxLetter}\nLetter Counts: ${JSON.stringify(letterCounts)}`;
      this.resultDiv.innerText = result;
    });
  };

  analyzePalindromes = (): void => {
    this.readDocument((documentContent) => {
      const modifiedContent = documentContent.replace(/\b(\w+)\b/g, (match, word) => {
        return word === word.split('').reverse().join('') ? '*'.repeat(word.length) : word;
      });

      this.resultDiv.innerText = `Modified Content:\n${modifiedContent}`;
    });
  };
}

const wordAnalyzer = new WordAnalyzer();

document.getElementById('analyzeLettersButton')?.addEventListener('click', wordAnalyzer.analyzeLetters);
document.getElementById('analyzePalindromeButton')?.addEventListener('click', wordAnalyzer.analyzePalindromes);
