package com.mindhub.HomeBanking;

import com.mindhub.HomeBanking.models.*;
import com.mindhub.HomeBanking.models.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

import static com.mindhub.HomeBanking.Utils.Utils.getRandomNumber;

@SpringBootApplication
public class HomeBankingApplication {

	@Bean
	public PasswordEncoder passwordEncoder() {

		return PasswordEncoderFactories.createDelegatingPasswordEncoder();

	}

	@Autowired
	private PasswordEncoder passwordEncoder;


	public static void main(String[] args) {
		SpringApplication.run(HomeBankingApplication.class, args);
		System.out.println("Mandale mecha pesho");
	}
		@Bean
		public CommandLineRunner initData(ClientRepository clientRepository, AccountRepository accountRepository, TransactionRepository transactionRepository, LoanRepository loanRepository, ClientLoanRepository clientLoanRepository, CardRepository cardRepository) {
			return (args) -> {
				// save a couple of customers

				Client cliente1 = new Client("melba", "lorenzo", "melba@mindhub.com", passwordEncoder.encode("tomBrady"));
				clientRepository.save(cliente1);
				Client cliente2 = new Client("pablo", "gomez", "pgomez@mindhub.com", passwordEncoder.encode("larryBird"));
				clientRepository.save(cliente2);
				Client admin = new Client("admin", "admin", "admin@admin.com",passwordEncoder.encode("admin"));
				clientRepository.save(admin);

				AccountType ahorro = AccountType.AHORRO;

				Account cuenta1 = new Account("VIN-" + getRandomNumber(10000000, 99999999), LocalDateTime.now(), 5000, ahorro, cliente1 );
				accountRepository.save(cuenta1);
				Account cuenta2 = new Account("VIN-" + getRandomNumber(10000000, 99999999), LocalDateTime.now().plusDays(1), 7500, ahorro, cliente2 );
				accountRepository.save(cuenta2);
				Account cuenta3 = new Account("VIN-" + getRandomNumber(10000000, 99999999), LocalDateTime.now(), 3500, ahorro, admin);
				accountRepository.save(cuenta3);

				LoanType hipotecario = LoanType.HIPOTECARIO;
				LoanType personal = LoanType.PERSONAL;
				LoanType automotriz = LoanType.AUTOMOTRIZ;

				Loan HIPOTECARIO = new Loan(hipotecario, 500000, List.of(12, 24, 36, 48, 60));
				loanRepository.save(HIPOTECARIO);
				Loan PERSONAL = new Loan(personal, 100000, List.of(6, 12, 24));
				loanRepository.save(PERSONAL);
				Loan AUTOMOTRIZ = new Loan(automotriz, 300000, List.of(6, 12, 24, 36));
				loanRepository.save(AUTOMOTRIZ);


			};


		}




}
