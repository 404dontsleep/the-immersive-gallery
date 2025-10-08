import { useTheme } from "@/hooks/useTheme";
import { Container, Root, Text } from "@react-three/uikit";
import { Button, Card } from "@react-three/uikit-default";
import { ChevronLeft, ChevronRight } from "@react-three/uikit-lucide";
import useSplitText from "@/hooks/useSplitText";

type ItemInfoProps = {
  index?: string;
  title?: string;
  description?: string;
};

export default function ItemInfo({
  index = "01",
  title = "Title Here",
  description = "Description Here",
}: ItemInfoProps) {
  const { theme } = useTheme();
  const {
    next: nextPage,
    prev: prevPage,
    currentText,
    canNext,
    canPrev,
  } = useSplitText(description, 200);
  return (
    <Root
      sizeX={0.3}
      sizeY={0.25}
      pixelSize={0.001}
      flexDirection={"column"}
      gap={4}
    >
      <Card
        padding={24}
        width={"100%"}
        flexGrow={1}
        backgroundColor={theme.baseBackground}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <Container
          flexDirection={"column"}
          justifyContent={"space-between"}
          height={"100%"}
          width={"100%"}
        >
          <Container flexDirection={"column"} gap={1} marginTop={8}>
            <Text fontSize={16} fontWeight={600} color={theme.baseText}>
              {index} {title}
            </Text>
            <Text
              fontSize={10}
              color={theme.baseText}
              marginTop={8}
              lineHeight={15}
            >
              {currentText}
            </Text>
          </Container>
        </Container>
      </Card>
      <Card
        backgroundColor={theme.baseBackground}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"row"}
        gap={6}
        height={"auto"}
        padding={4}
      >
        <Button
          size="icon"
          borderColor={theme.baseText}
          borderWidth={1}
          disabled={!canPrev}
          onPointerDown={prevPage}
          flexGrow={1}
        >
          <ChevronLeft color={theme.baseText} />
        </Button>
        <Button
          size="icon"
          borderColor={theme.baseText}
          borderWidth={1}
          disabled={!canNext}
          onPointerDown={nextPage}
          flexGrow={1}
        >
          <ChevronRight color={theme.baseText} />
        </Button>
      </Card>
    </Root>
  );
}
