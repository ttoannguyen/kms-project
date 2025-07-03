import type {
  Author,
  CompoundField,
  DsDescription,
  MetadataField,
  PrimitiveField,
  ControlledVocabularyField,
} from "@/types/datasetInterface";

type MetadataFields = MetadataField[] | undefined;

export function getTitle(fields: MetadataFields): string {
  if (!Array.isArray(fields)) return "";

  const field = fields.find(
    (f) => f.typeName === "title" && f.typeClass === "primitive"
  ) as PrimitiveField | undefined;

  return typeof field?.value === "string" ? field.value : "";
}

export function getDescription(fields: MetadataFields): string {
  if (!Array.isArray(fields)) return "";

  const field = fields.find(
    (f) => f.typeName === "dsDescription" && f.typeClass === "compound"
  ) as CompoundField<DsDescription> | undefined;

  return field?.value?.[0]?.dsDescriptionValue?.value || "";
}

export function getSubjects(fields: MetadataFields): string {
  if (!Array.isArray(fields)) return "";

  const field = fields.find(
    (f) => f.typeName === "subject" && f.typeClass === "controlledVocabulary"
  ) as ControlledVocabularyField | undefined;

  const values = Array.isArray(field?.value) ? field.value : [];
  return values.join(", ");
}

/**
 * Hiển thị tác giả theo chuẩn: Tên (Cơ quan)
 * Ví dụ: "Weiqin, Liu (Universiti Sains Malaysia), John Doe (Oxford University)"
 */
export function getAuthors(fields: MetadataFields): string {
  if (!Array.isArray(fields)) return "";

  const field = fields.find(
    (f) => f.typeName === "author" && f.typeClass === "compound"
  ) as CompoundField<Author> | undefined;

  const authors = field?.value ?? [];

  return authors
    .map((a) => {
      const name = a.authorName?.value?.trim() || "";
      return name;
    })
    .filter(Boolean)
    .join(", ");
}

/**
 * Chỉ lấy affiliation nếu có, fallback sang tên
 * Ví dụ: "Universiti Sains Malaysia, Oxford University"
 */
export function getAuthorsTop(fields: MetadataFields): string {
  if (!Array.isArray(fields)) return "";

  const field = fields.find(
    (f) => f.typeName === "author" && f.typeClass === "compound"
  ) as CompoundField<Author> | undefined;

  const authors = field?.value ?? [];

  return authors
    .map((author) => {
      const aff = author.authorAffiliation?.value?.trim();
      const name = author.authorName?.value?.trim();
      return aff || name || "";
    })
    .filter(Boolean)
    .join(", ");
}

/**
 * Chuỗi trích dẫn đơn giản: Tên tác giả, năm, "tiêu đề"
 */
export function getCitation(fields: MetadataFields, year?: string): string {
  const authors = getAuthors(fields);
  const title = getTitle(fields);
  const yearText = year || "n.d.";
  return `${authors}, ${yearText}, "${title}",`;
}

export function getFiletCitation(
  fields: MetadataFields,
  year?: string,
  filename?: string
): string {
  const authors = getAuthors(fields);
  const title = getTitle(fields);
  const yearText = year || "n.d.";
  return `<span>${authors}, ${yearText}, "${filename}"</span>, <i>${title}</i>`;
}

export function getDepositDate(fields?: MetadataFields): string | null {
  const depositField = fields?.find(
    (field) => field.typeName === "dateOfDeposit"
  );
  return typeof depositField?.value === "string" ? depositField.value : null;
}

export function getDepositor(fields: MetadataFields): string {
  if (!Array.isArray(fields)) return "";

  const field = fields.find(
    (f) => f.typeName === "depositor" && f.typeClass === "primitive"
  ) as PrimitiveField | undefined;

  return field?.value?.trim() || "";
}

export function getKeywords(fields: MetadataFields): string {
  if (!Array.isArray(fields)) return "";

  const field = fields.find(
    (f) => f.typeName === "keyword" && f.typeClass === "compound"
  ) as CompoundField<{ keywordValue?: PrimitiveField }> | undefined;

  const keywords = field?.value ?? [];

  return keywords
    .map((k) => k.keywordValue?.value?.trim() || "")
    .filter(Boolean)
    .join(", ");
}

export function getPublications(fields: MetadataFields): string {
  if (!Array.isArray(fields)) return "";

  const field = fields.find(
    (f) => f.typeName === "publication" && f.typeClass === "compound"
  ) as CompoundField<{ publicationCitation?: PrimitiveField }> | undefined;

  const publications = field?.value ?? [];

  return publications
    .map((p) => p.publicationCitation?.value?.trim() || "")
    .filter(Boolean)
    .join("; ");
}
