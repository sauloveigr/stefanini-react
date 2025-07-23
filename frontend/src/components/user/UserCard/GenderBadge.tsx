export const GenderBadge = ({ gender }: { gender?: string }) => {
  if (!gender) return null;

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${gender === "male"
        ? "bg-blue-100 text-blue-700"
        : gender === "female"
          ? "bg-pink-100 text-pink-700"
          : "bg-gray-100 text-gray-700"
        }`}
    >
      {gender === "male" ? "Masculino" : gender === "female" ? "Feminino" : "Outro"}
    </span>
  );
};