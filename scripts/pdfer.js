import fs from 'fs';
import path from 'path';
import pdfmake from 'pdfmake';

const { PdfPrinter } = pdfmake;

// 1. Определяем пути к стандартным шрифтам Roboto внутри node_modules
const fontDescriptors = {
  Roboto: {
    normal: path.resolve('node_modules/pdfmake/fonts/Roboto-Regular.ttf'),
    bold: path.resolve('node_modules/pdfmake/fonts/Roboto-Medium.ttf'),
    italics: path.resolve('node_modules/pdfmake/fonts/Roboto-Italic.ttf'),
    bolditalics: path.resolve('node_modules/pdfmake/fonts/Roboto-MediumItalic.ttf')
  }
};

// 2. Инициализируем принтер, передавая ему объект со шрифтами
const printer = pdfmake(fontDescriptors);

// 3. Создаем структуру документа (здесь обязательно должен быть текст)
const docDefinition = {
  content: [
    'Привет, мир! Это PDF, сгенерированный в Node.js через pdfmake.'
  ]
};

// 4. Генерируем PDF-документ (он создается в виде Readable Stream)
const pdfDoc = printer.createPdfKitDocument(docDefinition);

// 5. Сохраняем результат в файл
const writeStream = fs.createWriteStream('output.pdf');
pdfDoc.pipe(writeStream);
pdfDoc.end();

writeStream.on('finish', () => {
  console.log('PDF успешно сохранен в файл output.pdf');
});
