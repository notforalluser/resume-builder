import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function usePdfExport() {
  return async function exportPdf(node, fileName = 'Prince_Tiwari_Resume.pdf') {
    node.classList.add('exporting');
    await document.fonts?.ready;

    try {
      const canvas = await html2canvas(node, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: node.scrollWidth,
        windowHeight: node.scrollHeight,
        scrollX: 0,
        scrollY: 0
      });

      const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4', compress: true });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const pageMarginPt = 22;
      const drawableHeightPt = pdfHeight - pageMarginPt * 2;
      const pageCanvasHeight = Math.floor((drawableHeightPt * canvas.width) / pdfWidth);
      const domToCanvas = canvas.width / node.scrollWidth;
      const canvasToPdf = pdfWidth / canvas.width;
      const links = collectLinks(node, domToCanvas);
      const avoidRects = collectAvoidBreaks(node, domToCanvas);
      const slices = buildSlices(canvas.height, pageCanvasHeight, avoidRects);

      slices.forEach((slice, index) => {
        if (index > 0) pdf.addPage();
        const pageCanvas = document.createElement('canvas');
        const sliceHeight = slice.bottom - slice.top;
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;
        const context = pageCanvas.getContext('2d');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        context.drawImage(canvas, 0, slice.top, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);
        const imageHeight = (sliceHeight * pdfWidth) / canvas.width;
        pdf.addImage(pageCanvas.toDataURL('image/png'), 'PNG', 0, pageMarginPt, pdfWidth, imageHeight, undefined, 'FAST');
        addPageLinks(pdf, links, slice, canvasToPdf, pageMarginPt);
      });

      pdf.save(fileName);
    } finally {
      node.classList.remove('exporting');
    }
  };
}

function collectLinks(node, domToCanvas) {
  const root = node.getBoundingClientRect();
  return [...node.querySelectorAll('a[href]')].map((anchor) => {
    const rect = anchor.getBoundingClientRect();
    return {
      url: anchor.href,
      x: (rect.left - root.left + node.scrollLeft) * domToCanvas,
      y: (rect.top - root.top + node.scrollTop) * domToCanvas,
      width: rect.width * domToCanvas,
      height: rect.height * domToCanvas
    };
  });
}

function collectAvoidBreaks(node, domToCanvas) {
  const root = node.getBoundingClientRect();
  return [...node.querySelectorAll('.avoid-break')].map((element) => {
    const rect = element.getBoundingClientRect();
    return {
      top: (rect.top - root.top + node.scrollTop) * domToCanvas,
      bottom: (rect.bottom - root.top + node.scrollTop) * domToCanvas
    };
  }).sort((a, b) => a.top - b.top);
}

function buildSlices(canvasHeight, pageCanvasHeight, avoidRects) {
  const slices = [];
  let top = 0;
  const minUsefulPage = pageCanvasHeight * 0.75;

  while (top < canvasHeight - 1) {
    const desiredBottom = Math.min(top + pageCanvasHeight, canvasHeight);
    const conflict = avoidRects.find((rect) => rect.top < desiredBottom && rect.bottom > desiredBottom && rect.top - top > minUsefulPage);
    const bottom = conflict ? Math.max(top + 1, Math.floor(conflict.top - 10)) : desiredBottom;
    slices.push({ top: Math.floor(top), bottom: Math.floor(bottom) });
    top = bottom;
  }

  return slices;
}

function addPageLinks(pdf, links, slice, canvasToPdf, pageMarginPt) {
  const pageTop = slice.top;
  const pageBottom = slice.bottom;
  links
    .filter((link) => link.y < pageBottom && link.y + link.height > pageTop)
    .forEach((link) => {
      pdf.link(link.x * canvasToPdf, pageMarginPt + (link.y - pageTop) * canvasToPdf, link.width * canvasToPdf, link.height * canvasToPdf, { url: link.url });
    });
}
