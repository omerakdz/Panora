import { Body, Button, Container, Head, Heading, Html, Preview, Text, } from '@react-email/components';

interface ReviewRequestEmailProps {
    customerName: string;
    reviewUrl: string;
}

export default function ReviewRequestEmail({
    customerName,
    reviewUrl,
}: ReviewRequestEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Hoe tevreden bent u over onze service?</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>Bedankt {customerName}! 🙏</Heading>

                    <Text style={text}>
                        We hopen dat u tevreden bent met onze ramenwasservice.
                        Uw mening is belangrijk voor ons!
                    </Text>

                    <Text style={text}>
                        Zou u een momentje hebben om een review achter te laten?
                        Het kost maar 30 seconden en helpt ons enorm.
                    </Text>

                    <Button style={button} href={reviewUrl}>
                        Review schrijven op Google ⭐
                    </Button>

                    <Text style={footer}>
                        Met vriendelijke groet,<br />
                        Team Panora
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
};

const h1 = {
    color: '#044D8E',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0',
    textAlign: 'center' as const,
};

const text = {
    color: '#0F61AC',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '16px 0',
    textAlign: 'center' as const,
};

const button = {
    backgroundColor: '#1792D0',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '100%',
    padding: '12px',
    margin: '24px 0',
};

const footer = {
    color: '#8898aa',
    fontSize: '14px',
    lineHeight: '24px',
    margin: '24px 0',
    textAlign: 'center' as const,
};