const maskId = (id: string) => {
  if (!id) return '';
  const firstPart = id.slice(0, 8);
  const lastPart = id.slice(-4);
  return `${firstPart}...${lastPart}`;
};

export default maskId;
