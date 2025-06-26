function createRotatingText(text: string) {
  let current = ` ${text} `;

  return () => {
    current = current.slice(1) + current[0];
    return current;
  };
}

const nextRotation = createRotatingText('🔁 Кружляє текст!');

setInterval(() => {
  const rotated = nextRotation();
  console.log(rotated);
}, 1000);
